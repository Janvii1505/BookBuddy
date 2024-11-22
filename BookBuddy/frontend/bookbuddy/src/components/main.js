import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Cookies from 'js-cookie'; 
import Home from './Home';
import Book from './Book';
import Profile from './Profile';
import BookDetail from './BookDetail';
import Signup from './Signup';
import Login from './Login';
import Navbar from './Navbar';
import GenreBooks from './GenreBooks';
import Footer from './Footer';
import Wishlist from './Wishlist';

function Main() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = Cookies.get('user_data');
        if (userData) {
            setUser(JSON.parse(userData)); 
        }
    }, []);

    return (
        <div>
            <Router>
                <Navbar user={user} setUser={setUser} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/books" element={<Book />} />
                    <Route path="/profile" element={<Profile user={user} />} />
                    <Route path="/books/:id" element={<BookDetail />} />
                    <Route path="/genre/:genre" element={<GenreBooks />} />
                    <Route path="/signup" element={<Signup setUser={setUser} />} />
                    <Route path="/login" element={<Login setUser={setUser} />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                </Routes>
                <Footer/>
            </Router>
        </div>
    );
}

export default Main;
