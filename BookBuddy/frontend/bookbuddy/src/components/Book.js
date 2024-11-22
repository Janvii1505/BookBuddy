import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

function Book() {
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState({});
  const [expandedGenre] = useState('');
  const [query, setQuery] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userCookie = Cookies.get('user_data');
    setIsLoggedIn(!!userCookie);
  }, []);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/books/')
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the books!", error);
      });
  }, []);

  useEffect(() => {
    const fetchWishlist = async () => {
      const savedWishlist = Cookies.get('wishlist');
      const yourToken = Cookies.get('token'); 
    
      if (isLoggedIn && yourToken) { 
        try {
          const response = await axios.get('http://127.0.0.1:8000/user/wishlist', {
            headers: {
              'Authorization': `Bearer ${yourToken}` 
            }
          });
          const userWishlist = response.data;
          if (savedWishlist) {
            const mergedWishlist = mergeWishlists(userWishlist, JSON.parse(savedWishlist));
            setWishlist(mergedWishlist);
          } else {
            setWishlist(userWishlist);
          }
        } catch (error) {
          console.error("Error fetching user's wishlist from server", error);
          alert("Failed to load wishlist. Please try again later.");
        }
      } else if (savedWishlist) {
        try {
          setWishlist(JSON.parse(savedWishlist));
        } catch (error) {
          console.error("Failed to parse wishlist from cookies", error);
          setWishlist([]);
        }
      } else {
        setWishlist([]);
      }
    };
    
    fetchWishlist();
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn && wishlist.length > 0) {
      Cookies.set('wishlist', JSON.stringify(wishlist), { expires: 7 });
    }
  }, [wishlist, isLoggedIn]);

  const mergeWishlists = (serverWishlist, localWishlist) => {
    const mergedWishlist = [...serverWishlist];
    localWishlist.forEach(localBook => {
      if (!serverWishlist.some(serverBook => serverBook.id === localBook.id)) {
        mergedWishlist.push(localBook);
      }
    });
    return mergedWishlist;
  };

  useEffect(() => {
    if (query) {
      const filtered = books.filter(book =>
        book.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredBooks(filtered);
    } else {
      setFilteredBooks([]);
    }
  }, [query, books]);

  useEffect(() => {
    if (books.length > 0) {
      const groupedBooks = groupBooksByGenre(books);
      setGenres(groupedBooks);
    }
  }, [books]);

  const groupBooksByGenre = (books) => {
    return books.reduce((acc, book) => {
      if (!acc[book.genre]) acc[book.genre] = [];
      acc[book.genre].push(book);
      return acc;
    }, {});
  };

  const getRandomBooks = (books, count = 6) => {
    return books.sort(() => 0.5 - Math.random()).slice(0, count);
  };
  const toggleWishlist = (book) => {
    const MAX_WISHLIST_SIZE = 10;
  
    if (!isLoggedIn) {
      alert('You need to log in first to add items to your wishlist.');
      return;
    }
  
    setWishlist((prevWishlist) => {
      if (prevWishlist.some(item => item.id === book.id)) {
        
        return prevWishlist.filter(item => item.id !== book.id);
      } else {
        if (prevWishlist.length < MAX_WISHLIST_SIZE) {
          return [...prevWishlist, book];
        } else {
          alert(`You can only add up to ${MAX_WISHLIST_SIZE} books to your wishlist.`);
          return prevWishlist; 
        }
      }
    });
  };
  


  
  const isInWishlist = (bookId) => {
    return wishlist.some(book => book.id === bookId);
  };

  const goToWishlist = () => {
    navigate('/wishlist');
  };

  const handleLogout = () => {
    setWishlist([]);
    Cookies.remove('wishlist');
    alert('You have been logged out and your wishlist has been cleared.');
    navigate('/');
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8">
            <div className="input-group input-group-lg mb-3">
              <input
                type="text"
                className="form-control mt-5"
                placeholder="Search for a book title..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{ border: "1px solid #1A3A60" }}
              />
              <div className="input-group-append">
                <button className="btn mt-5 mx-3" style={{ color: 'white', backgroundColor: '#6A4A3C' }} type="button" onClick={goToWishlist}>
                  <i className="fas fa-heart fa-2x"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid mt-5">
          {query && (
            <div className="row mt-4">
              {filteredBooks.length > 0 ? (
                filteredBooks.map(book => (
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
                            className={`btn btn-sm ${isInWishlist(book.id) ? 'btn-danger' : 'btn-outline-danger'} mt-auto`}
                            onClick={(e) => {
                              e.preventDefault();
                              toggleWishlist(book);
                            }}
                          >
                            {isInWishlist(book.id) ? 'In Wishlist' : 'Add to Wishlist'}
                          </button>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <p className="text-center">No books found</p>
              )}
            </div>
          )}
          {!query && (
            <div className="container-fluid mt-5">
              {Object.keys(genres).map((genre) => (
                <div key={genre} className="mb-5 mx-5">
                  <h3 className='card-main-title-bg text-center'>{genre} Books</h3>
                  <div className="row mt-4">
                    {(expandedGenre === genre ? genres[genre] : getRandomBooks(genres[genre])).map(book => (
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
                                className={`btn btn-sm ${isInWishlist(book.id) ? 'btn-danger' : 'btn-outline-danger'} mt-auto`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  toggleWishlist(book);
                                }}
                              >
                                {isInWishlist(book.id) ? 'In Wishlist' : 'Add to Wishlist'}
                              </button>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                  {expandedGenre !== genre && (
                    <Link to={`/genre/${genre}`}>
                      <button className="btn btn-primary">View All {genre} Books</button>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Book;
