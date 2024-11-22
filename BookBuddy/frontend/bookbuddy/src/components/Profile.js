import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = ({ user }) => {
  const [rentedBooks, setRentedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRentedBooks = async () => {
      if (user) {
        try {
          const rentedBooksResponse = await axios.get(
            `http://127.0.0.1:8000/rented_books/user_rented_books/?username=${user.username}`
          );
          const rentedBooksData = rentedBooksResponse.data;
          const isbnList = rentedBooksData.map((book) => book.book_isbn);
          const bookDetailsResponse = await axios.get(
            `http://127.0.0.1:8000/books/?isbns=${isbnList.join(',')}`
          );
          const bookDetailsData = bookDetailsResponse.data;
          const bookDetailsMap = {};
          bookDetailsData.forEach((book) => {
            bookDetailsMap[book.isbn] = book;
          });
          const updatedRentedBooks = rentedBooksData.map((rentedBook) => ({
            ...rentedBook,
            bookDetail: bookDetailsMap[rentedBook.book_isbn],
          }));

          setRentedBooks(updatedRentedBooks);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching rented books or book details:', error);
          setLoading(false);
        }
      }
    };

    fetchRentedBooks();
  }, [user]);

  if (!user) {
    return (
      <div className="profile-container pb-5">
        <div className="card text-center shadow">
          <div className="card-body">
            <h2 className="card-title card-main-title-bg">Login Required</h2>
            <p className="card-text login-text">You need to log in to view this page.</p>
            <a href="/login" className="btn btn-primary">Login</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container py-5">
      <div className="container" style={{ paddingTop: 20, marginBottom: 80 }}>
        <div className="card">
          <div className="card-body">
            <h2 className="card-title text-center pt-4 card-main-title-bg pb-4">User Profile</h2>
            <p style={{ paddingLeft: 200 }}><strong>Username:</strong> {user.username}</p>
            <p style={{ paddingLeft: 200 }}><strong>First Name:</strong> {user.first_name}</p>
            <p style={{ paddingLeft: 200 }}><strong>Last Name:</strong> {user.last_name}</p>
            <p style={{ paddingLeft: 200 }}><strong>Email:</strong> {user.email}</p>
            <p style={{ paddingLeft: 200 }}><strong>Phone Number:</strong> {user.phone_number}</p>
            <p style={{ paddingLeft: 200 }}><strong>Library Card Number:</strong> {user.library_card_number}</p>
          </div>
        </div>
      </div>

      {/* Rented Books Section */}
      <div className="card card-profile mt-4 rented-books-section">
        <div className="card-body">
          <h3 className="card-title text-center card-main-title-bg">Rented Books</h3>

          {rentedBooks.length > 0 ? (
            <ul className="list-group">
              {rentedBooks.map((rentedBook) => {
                const { bookDetail } = rentedBook;

                return (
                  <li key={rentedBook.id} className="list-group-item">
                    <div className="d-flex align-items-center">
                      {/* Show the book cover and title */}
                      {bookDetail ? (
                        <>
                          <img
                            src={bookDetail.cover}
                            alt={bookDetail.title}
                            className="book-cover"
                            style={{ width: '200px', height: '250px', marginRight: '50px' }}
                          />
                          <div>
                            <strong>Title:</strong> {bookDetail.title} <br />
                            <strong>ISBN:</strong> {rentedBook.book_isbn} <br />
                            <strong>Rented Date:</strong> {new Date(rentedBook.rented_date).toLocaleDateString()} <br />
                            <strong>Due Date:</strong> {new Date(rentedBook.due_date).toLocaleDateString()}
                          </div>
                        </>
                      ) : (
                        <div>Loading book details...</div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-center">No rented books found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
