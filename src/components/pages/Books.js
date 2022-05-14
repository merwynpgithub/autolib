import axios from 'axios';
import React, {useState, useEffect} from 'react';

import { Form, Button, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navigation from '../Navigation';
import '../styles/grab.scss';

function Books() {
  const [book, setBook] = useState([]);
  const [searchValue, setSearcValue] = useState("");

  function handleSearch(e) {
    e.preventDefault();
    const url = "/api/resources?find=" + searchValue;

    axios.get(url)
    .then(res => setBook(res.data));
  }

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
        <div className="search">
        <Form className="d-flex" onSubmit={handleSearch}>
          <FormControl
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            onChange={e => setSearcValue(e.target.value)}
          />
          <Button variant="outline-success" type="submit">Search</Button>
        </Form>
        </div>
        <div className="books_grab" >{bookList} </div>
      </div>
    </>
  );
}

export default Books;
