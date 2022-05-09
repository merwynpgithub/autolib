import axios from 'axios';
import React, {useState, useEffect} from 'react';

import '../styles/books.scss';

function Books() {
  const [book, setBook] = useState([]);

  useEffect(() => {
    axios.get("/api/resources").then(res => setBook(res.data));
  }, [])

  const bookList = book.map(book => {
    return (
      <div className="book-list" key={book.id}>
        <img src={book.cover_image} alt={book.title} />
        <p>
          <a href={
            "/books/" + book.id
          }>
            {
            book.title
          }</a>
        </p>
      </div>
    );
  });

  return (
    <>
      <div className="container-fluid book-display" >
        <p style={
          {
            fontWeight: "bold",
            fontSize: "1.5em",
            textAlign: "center"
          }
        }>Grab a Book</p>
        <div className="container-fluid" style={
          {
            display: "flex",
            justifyContent: "space-around",
            overflowX: "auto",
            border: "1px solid black"
          }
        }>
          {bookList} </div>
      </div>
    </>
  );
}

export default Books;
