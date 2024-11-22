import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false)

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
    const fetchWishlist = async () => {
      if (isLoggedIn) {
        try {
          const response = await axios.get('http://127.0.0.1:8000/user/wishlist');
          setWishlist(response.data);
        } catch (error) {
          console.error("Error fetching user's wishlist from server", error);
        }
      } else {
        const savedWishlist = Cookies.get('wishlist');
        if (savedWishlist) {
          setWishlist(JSON.parse(savedWishlist));
        }
      }
    };

    fetchWishlist();
  }, []);

  const removeFromWishlist = (bookId) => {
    const updatedWishlist = wishlist.filter(book => book.id !== bookId);
    setWishlist(updatedWishlist);
    console.log(updatedWishlist)

    if (isLoggedIn) {
      Cookies.set('wishlist', JSON.stringify(updatedWishlist), { expires: 1 });
    }
  };

  return (
    <div className="container">
      <h2 className="text-center card-main-title-bg pt-5">Your Wishlist</h2>
      <div className="row mt-4">
        {wishlist.length > 0 ? (
          wishlist.map(book => (
            <div className="col-xl-3 col-lg-4 col-md-4 col-sm-6 mb-4" key={book.id}>
              <Link to={`/books/${book.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="card h-100 transparent-bg">
                  <img
                    src={book.cover}
                    className="img-fluid card-img-top"
                    alt={book.title}
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-truncate" title={book.title}>
                      {book.title}
                    </h5>
                    <button
                      className="btn btn-danger mt-auto"
                      onClick={(e) => {
                        e.preventDefault();
                        removeFromWishlist(book.id);
                      }}
                    >
                      Remove from Wishlist
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center" style={{ fontSize: 25, fontFamily: 'initial' }}>Your wishlist is empty.</p>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
