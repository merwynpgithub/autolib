import axios from 'axios';
import React, {useState, useEffect} from 'react';

import Navigation from '../Navigation';
import '../styles/books.scss';

function Books() {
  const [book, setBook] = useState([]);

  useEffect(() => {
    axios.get("/api/resources").then(res => setBook(res.data));
  }, [])

  const bookList = book.map(book => {
    return (
      <div className="book" key={book.id}>
        <a href={"/books/" + book.id}><img src={book.cover_image} alt={book.title} /></a>
        <p className='title'>{book.title}</p>
      </div>
    );
  });

  return (
    <>
      <Navigation />
      <div className="book-display" >
        <h1 id="grab">GRAB A BOOK</h1>
        <div className="books_grab" >{bookList} </div>
      </div>
    </>
  );
}

export default Books;
