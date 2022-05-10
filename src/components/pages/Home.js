import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Navigation from '../Navigation';
import '../styles/books.scss';

function Home() {
  const [book, setBook] = useState([]);

  useEffect(() => {
    axios.get("/api/resources").then(res => setBook(res.data));
  }, [])

  const bookList = book.map(book => {
    return (
      <div className="book-list" key={book.id}>
        <img src={book.cover_image} alt={book.title} />
        <p>{book.title}</p>
      </div>
    );
  });

  return (
    <>
    <Navigation />
    <div className="container-fluid book-display" >
      <p id="grab">Recently Added Books</p>
      <div className="container-fluid books" >{bookList} </div>
    </div>
    </>
    
  );
}

export default Home;
