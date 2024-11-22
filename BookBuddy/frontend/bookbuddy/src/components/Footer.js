import React from 'react';

const Footer = () => {
  return (
    <footer className="footer-modern text-center">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-column">
            <h5>About Us</h5>
            <p>We are a modern library offering a wide collection of books across genres. Unlock the doors to knowledge with us!</p>
          </div>
          <div className="footer-column">
            <h5>Quick Links</h5>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/books">Books</a></li>
              <li><a href="/profile">Profile</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h5 style={{paddingRight:250}}>Follow Us</h5>
            <ul className="social-icons">
              <li><a href="https://facebook.com" className="icon-facebook" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a></li>
              <li><a href="https://twitter.com" className="icon-twitter" aria-label="Twitter"><i className="fab fa-twitter"></i></a></li>
              <li><a href="https://instagram.com" className="icon-instagram" aria-label="Instagram"><i className="fab fa-instagram"></i></a></li>
              <li><a href="https://linkedin.com" className="icon-linkedin" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Your Library. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
