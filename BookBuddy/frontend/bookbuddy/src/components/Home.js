import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/books/')
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the books!', error);
      });
  }, []);

  return (
    <>
      <div className='container-fluid pb-5' style={{ padding: 0, margin: 0 }}>
        <img src="home.jpg" alt="Library" className="book2" />
        <div className="text-overlay" style={{paddingRight:100}}>
          <h1>A haven for curious minds</h1>
          <p>Where knowledge blooms</p>
        </div>
      </div>

      <div className="container-fluid pb-1">
        <h2 className='card-main-title-bg ps-5  text-center'>Popular books</h2>
      </div>

      <div className="row row-cols-1 row-cols-md-4 px-5 pt-2   ">
        {books.slice(20, 24).map((book, index) => (
          <Link to={`/books/${book.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>

            <div className="col" key={index}>
              <div className="card card-bg">
                <div className='div-img'>
                  <img src={book.cover} alt={book.title} className='img-fluid card-img-top' height={300} style={{ objectFit: "cover" }} />
                </div>
                <div className="card-body card-body-bg">
                  <h5 className="card-title text-truncate">{book.title}</h5>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="text1 text-center">
        <p >A library is a treasure chest <br/>
          of knowledge.</p>
      </div>

      <div className="container text-center p-5">
        <div className="row py-4 homediv card-body-bg">
          <div className="col-sm">
            <img src="/home-info.jpg" alt="Description" className="img-fluid book6" style={{borderRadius:70}}/>

          </div>
          <div className="col-sm" style={{ paddingTop: 100, fontFamily: 'initial', fontSize: 20, fontWeight: 'bold' }}>
            A book is a collection of written or printed pages bound together, serving as a medium to convey knowledge, stories, or ideas across various genres.
          </div>
        </div>
      </div> 


      <div id="demo1" className="carousel slide p-5" data-bs-ride="carousel">
        <div className="carousel-inner text-center">
          <div className="carousel-item active">
            <div className="container text-center">
              <h1 className="cust">
                REVIEWS
              </h1>
              <h2 className="fav1 text-center">
                User-friendly website with an intuitive search feature<br/>
                finding books has never been easier!
              </h2>
              <div style={{ paddingTop: "20px" }}>
                <img src="re1.avif" alt="review" title="review" style={{ borderRadius: "70%", height: "130px", width: "130px" }} />
              </div>
              <h3 style={{ paddingTop: "10px", fontWeight: "600" }}>Patel Meet</h3>
            </div>
          </div>

          <div className="carousel-item">
            <div className="container text-center" >
              <h1 className="cust">
                REVIEWS
              </h1>
              <h2 className="fav1 text-center">
              An exceptional library with a seamless digital experience. <br/>
              Highly recommended!
              </h2>
              <div style={{ paddingTop: "20px" }}>
                <img src="re2.avif" alt="review" title="review" style={{ borderRadius: "70%", height: "130px", width: "130px" }} />
              </div>
              <h3 style={{ paddingTop: "10px", fontWeight: "600" }}>Arvadia Harsh</h3>
            </div>
          </div>

          <div className="carousel-item">
            <div className="container text-center">
              <h1 className="cust">
                REVIEWS
              </h1>
              <h2 className="fav1 text-center">
              The online catalog is well-organized, <br/>
              and borrowing books is a breeze.
              </h2>
              <div style={{ paddingTop: "20px" }}>
                <img src="re3.avif" alt="review" title="review" style={{ borderRadius: "70%", height: "130px", width: "130px" }} />
              </div>
              <h3 style={{ paddingTop: "10px", fontWeight: "600" }}>Doshi Nihal</h3>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev " data-bs-target="#demo1" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button className="carousel-control-next " data-bs-target="#demo1" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
    </>
  );
}

export default Home;
