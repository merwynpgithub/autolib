import axios from 'axios';
import React, {useState, useEffect} from 'react';

import '../styles/books.scss';

function Books() {
  //Use Local storage to set and clear logged in users
  // localStorage.setItem("name", "Carolin");
  
  const [book, setBook] = useState([]);

  useEffect(() => {
    axios.get("/api/resources").then(res => setBook(res.data));
  }, [])

  const bookList = book.map(book => {
    return (
      <div className="book-list" key={book.id}>
        <img src={book.cover_image} alt={book.title} />
        <p>
          <a href={"/books/" + book.id}>{book.title}</a>
        </p>
      </div>
    );
  });

  return (
    <>
      <div className="container-fluid book-display" >
        <p id="grab">Grab a Book</p>
        <div className="container-fluid books" >{bookList} </div>
      </div>
    </>
  );
}

export default Books;
