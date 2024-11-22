import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie'

function BookDetail({ user }) {  
    const { id } = useParams();  
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const [book, setBook] = useState(null);  
    const [userID, setUserID] = useState(null);

    useEffect(() => {
        // Fetch the book details using the book ID with axios
        axios.get(`http://127.0.0.1:8000/books/${id}/`)  
            .then(response => {
                setBook(response.data); 
            })
            .catch(error => {
                console.error("There was an error fetching the book data!", error);
            });
    }, [id]);
    useEffect(() => {
        // Check if 'user_data' cookie exists and retrieve username from it
        const userCookie = Cookies.get('user_data');
        if (userCookie) {
          setIsLoggedIn(true); 
        } else {
          setIsLoggedIn(false); 
        }
      }, []);
    useEffect(() => {
        // Check if 'user_data' cookie exists and retrieve username from it
        const userCookie = Cookies.get('user_data');
        if (userCookie) {
          const parsedUserData = JSON.parse(userCookie);
          setUserID(parsedUserData.id)
        }
      }, []);
      
    // Function to rent the book
    const handleRentBook = () => {

        if (!isLoggedIn) {
            alert("User is not logged in.")
            console.log("User is not logged in.");
            return;
        }

        if (isLoggedIn && book) {
            const rentedBookData = {
                username: userID,  
                book_title: book.id,
                book_isbn: book.isbn 
            };
            console.log("Rented book data:", rentedBookData);


            axios.post(`http://127.0.0.1:8000/rented_books/`, rentedBookData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(response => {
                    console.log("Book rented successfully:", response.data);

                    alert("Book rented successfully:", response.data)
                })
                .catch(error => {
                    if (error.response) {
                        console.error("Error details:", error.response.data);
                    } else {
                        console.error("There was an error renting the book:", error);
                    }
                });

        }
    };

    if (!book) return <div>Loading...</div>;

    return (
        <>
            <div className="container mt-5 p-5">
                <div className="row">
                    <div className="col-md-4">
                        <img
                            src={book.cover}
                            className="img-fluid"
                            alt={book.title}
                            style={{ objectFit: 'cover', maxHeight: '400px' }}
                        />
                        <button className="btn btn-primary mt-3" style={{display:'flex'}} onClick={handleRentBook}>
                            Rent this Book
                        </button>
                    </div>
                    <div className="col-md-8">
                        <h2>{book.title}</h2>
                        <p><strong>Author:</strong> {book.author}</p>
                        <p><strong>ISBN:</strong> {book.isbn}</p>
                        <p><strong>Published:</strong> {book.published_date}</p>
                        <p><strong>Publisher:</strong> {book.publisher}</p>
                        <p><strong>Genre:</strong> {book.genre}</p>
                        <p><strong>Pages:</strong> {book.pages}</p>
                        <p><strong>Description:</strong> {book.description}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BookDetail;
