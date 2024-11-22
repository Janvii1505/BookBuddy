import { useState } from 'react';
import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

// Function to submit form data
async function submitForm(data) {
  const csrftoken = Cookies.get('csrftoken');

  const response = await axios.post('http://127.0.0.1:8000/signup/', data, {
    headers: {
      'X-CSRFToken': csrftoken, 
      'Content-Type': 'application/json' 
    }
  });

  return response.data;
}

function Signup({ setUser }) {
  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    gender: 'M', 
    phone_number: '',
    library_card_number: generateLibraryCardNumber() 
  });

  const [errors, setErrors] = useState({}); 
  const navigate = useNavigate();

  // Handle form input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Validation logic for phone number and password
  const validateForm = () => {
    const newErrors = {};

    // Phone number validation: must be 10 digits and numeric only
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone_number)) {
      newErrors.phone_number = 'Phone number must be 10 digits.';
    }

    // Password validation: minimum 8 characters, with at least one uppercase, one lowercase, one number, and one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; 
    }

    const dataToSubmit = {
      username: formData.username,
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      password: formData.password,
      gender: formData.gender,
      phone_number: formData.phone_number,
      library_card_number: formData.library_card_number
    };

    try {
      const response = await submitForm(dataToSubmit);

      // Automatically log in after signup
      const loginResponse = await axios.post('http://127.0.0.1:8000/login/', {
        username: formData.username,
        password: formData.password,
      });

      setUser(loginResponse.data); 
      Cookies.set('user_data', JSON.stringify(loginResponse.data), { expires: 7 }); // Store user data in cookies, expires in 7 days

      // Navigate to home page after signup and login
      navigate('/');
    } catch (error) {
      console.error('Signup failed', error.response ? error.response.data : error);
      alert('An error occurred during signup.');
    }
  };

  return (
    <>
    <div style={{ backgroundImage: 'url("/backg.AVIF")', backgroundSize: 'cover',height:900}}>
      <div className="container" style={{ height: 500, width: 500 ,paddingTop:40 }}>
        <div className="card shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-center">Signup</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Username:</label>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">First Name:</label>
                <input
                  type="text"
                  name="first_name"
                  className="form-control"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Last Name:</label>
                <input
                  type="text"
                  name="last_name"
                  className="form-control"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email:</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password:</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                {errors.password && <p className="text-danger">{errors.password}</p>} 
              </div>
              <div className="mb-3">
                <label className="form-label">Gender:</label>
                <select
                  name="gender"
                  className="form-select"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                  <option value="O">Other</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Phone Number:</label>
                <input
                  type="tel"
                  name="phone_number"
                  className="form-control"
                  value={formData.phone_number}
                  onChange={handleChange}
                  required
                />
                {errors.phone_number && <p className="text-danger">{errors.phone_number}</p>} 
              </div>
              <div className="mb-3">
                <label className="form-label">Library Card Number:</label>
                <input
                  type="text"
                  name="library_card_number"
                  className="form-control"
                  value={formData.library_card_number}
                  readOnly
                />
              </div>
              <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

// Function to generate a random library card number
const generateLibraryCardNumber = () => {
  return Math.random().toString(36).substring(2, 12).toUpperCase();
};

export default Signup;
