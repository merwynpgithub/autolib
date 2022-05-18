import axios from 'axios';
import React, {useState, useEffect} from 'react';

import { Form, Button, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navigation from '../Navigation';
import '../styles/grab.scss';

function Books() {
  const [book, setBook] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  function handleSearch(e) {
    e.preventDefault();
    const url = "/api/resources?find=" + searchValue;
    
    axios.get(url)
    .then(res => {
      setBook(res.data);
    });
  }

  useEffect(() => {
    
    axios.get("/api/resources").then(res => setBook(res.data));
  }, [])
  
  const defaultImageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqlyVgjqhw65UtsRfTi-zafiSFb7zitbpQAjcrlqKZcCgBiDyWv4MV4CbgVcxFlXtf-8I&usqp=CAU";
  
  const bookList = book.map(book => {
    return (
      <div className="book" key={book.id}>
        <a href={"/books/" + book.id}><img src={book.cover_image || defaultImageUrl} alt={book.title} loading="lazy" /></a>
        <p className='title'>{book.title}</p>
      </div>
    );
  });

  return (
    <>
      <Navigation />
      <div className="book-display" >
        <div className='head'>
          <h1 id="grab">CATALOGUE</h1>
          <div className="search">
            <Form className="d-flex" onSubmit={handleSearch}>
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
              />
              <Button className='button' type="submit">Search</Button>
            </Form>
          </div>
        </div>
        
        <div className="books_grab" >{bookList} </div>
      </div>
    </>
  );
}

export default Books;
