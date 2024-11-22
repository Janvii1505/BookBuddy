import { useParams, Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function GenreBooks() {
  const { genre } = useParams();  
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); 

  // Fetch books by genre
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/books/genre/'.concat(genre).concat('/'))  
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the books!", error);
      });
  }, [genre]);

  // Filter books based on search query
  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase())  
  );

  return (
    <div className="container mt-5 p-5">
      <h3 className="card-main-title-bg text-center">{genre} Books</h3>
      
      <div className='row justify-content-center'>
      <div className="col-md-10 col-lg-8">
              <div className="input-group input-group-lg mb-5">
        <input
          type="text"
          className="form-control mt-3"
          placeholder="Search for a book title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}  
        />
      </div>
      </div>
      </div>
      <div className="row">
        {filteredBooks.length > 0 ? (
          filteredBooks.map(book => (
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 mb-4" key={book.id}>
              <Link to={`/books/${book.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="card h-100 bg-transparent-card">
                  <div className="img-container" style={{ height: '300px', overflow: 'hidden'}}>
                    <img
                      src={"http://127.0.0.1:8000".concat(book.cover)}
                      className="img-fluid card-img-top"
                      alt={book.title}
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-truncate" title={book.title}>
                      {book.title}
                    </h5>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center">No books found matching your search</p>
        )}
      </div>
    </div>
  );
}

export default GenreBooks;
