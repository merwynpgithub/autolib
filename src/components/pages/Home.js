import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Navigation from '../Navigation';
import '../styles/books.scss';

function Home() {
  const [book, setBook] = useState([]);

  useEffect(() => {
    axios.get("/api/resources?limit=3").then(res => setBook(res.data));
  }, [])

  const bookList = book.map(book => {
    return (
      <div className="book-list" key={book.id}>
        <img src={book.cover_image} alt={book.title} />
      </div>
    );
  });

  return (
    <>
    <Navigation />
    <div className="hero" >
      <div className='section_1'>
        <h1>A NEW WAY TO READ</h1>
        <p>Browse and request your favourite books in your neighbourhood. Pick them up at your convenience, and pass them on once you’re done reading. It’s that simple!</p>
        <img src="/arrow.gif" alt="arrow" />
      </div>
      <div className="container-fluid books_home section_2" >{bookList} </div>
    </div>
    </>
    
  );
}

export default Home;
