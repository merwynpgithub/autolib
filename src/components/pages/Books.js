import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useNavigate, useOutletContext, Link } from 'react-router-dom';

import { Form, Button, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navigation from '../Navigation';
import Footer from '../Footer';
import '../styles/grab.scss';

import { getAvailability } from '../../helper/book-utilities';

function Books() {
  const appData = useOutletContext();

  const [book, setBook] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filtered, setFiltered] = useState(false);
  const navigate = useNavigate();
  
  function handleSearch(e) {
    e.preventDefault();
    const url = "/api/resources?withStatus&find=" + searchValue;
    
    axios.get(url)
    .then(res => {
      const books = [];
      res.data.forEach(record => books.push({...record, status: { ...record.status }}));
      setBook(books);
    });
  }
  
  useEffect(() => {
    axios.get("/api/resources?withStatus").then(res => {
      setBook(res.data);
    });
  }, [])
  
  const defaultImageUrl = "/no-photo-available.png";
  
  const requestBook = book => {
    axios.post("/api/requests", { "resourceId": book.id })
    .then(() => {
      navigate("/request");
    })
    .catch(err => console.log(err));
  }

  const getRequestLink = (book, user) => {
    if (!user) return;
    let s = '';
    if (book.status?.available && book.current_possessor_id!==user.id) {
      s = <p onClick={() => requestBook(book)}className="request">Request now</p>
    } 
    return s;
  }
  
  const bookList = book.filter(b => !filtered || b.status?.available).map(book => {
    return (
      <div className="book" key={book.id}>
        <Link to={`/books/${book.id}`}><img src={book.cover_image || defaultImageUrl} alt={book.title} loading="lazy" /></Link>
        <p className='title'>{book.title}</p>
        {getAvailability(book, appData.user, true)}
        {getRequestLink(book, appData.user)}
      </div>
    );
  });

  return (
    <>
      <Navigation appData={appData}/>
      <div className="book-display" >
        <div className='head'>
          <h1 id="grab">CATALOGUE</h1>
          <div className="search">
            <Form className="d-flex" onSubmit={handleSearch}>
            <Form.Check 
              className="filter"
              type={'checkbox'}
              id={`default-checkbox`}
              label={`Hide unavailable books`}
              checked={filtered}
              onChange={() => setFiltered(!filtered)}
            />
            <FormControl
                type="search"
                placeholder="Search Title, Author, Genre"
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
      <Footer />
    </>
  );
}

export default Books;
