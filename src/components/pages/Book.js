import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navigation from '../Navigation';
import '../styles/book.scss';

function Book() {
  const [bookDetails, setBookDetails] = useState({});
  const [bookStatus, setBookStatus] = useState("");

  // For Grab button
  let notLogged = true;
  if (localStorage.getItem("user")) 
    notLogged = false;
  


  const parameter = useParams();
  const bookId = Number(parameter.bookId);

  useEffect(() => {
    axios.get("/api/resources").then(res => {
      const bookArray = res.data;
      const renderedBook = bookArray.filter(book => book.id === bookId);
      setBookDetails(renderedBook[0]);
      setBookStatus(renderedBook[0]["status"]);
    });
  }, [])

  return (
    <>
      <Navigation/>
      <div className='book_wrapper'>
        <div className='section_1'>
          <img 
            src={bookDetails.cover_image}
            alt={bookDetails.title}
          />
        </div>

        <div className='section_2'>
          <p id="title">{bookDetails.title}</p>
          <p className='bold author'>by {bookDetails.authors}</p>
          <br />
          <p><span className="bold">GENREs:</span> {bookDetails.genres}</p>
          <p><span className="bold">ISBN:</span> {bookDetails.isbn}</p>
          <p><span className="bold">Status:</span> {bookStatus["text"]}</p>
          <br />
          <p>{bookDetails.description}</p>
          {bookStatus["available"] && notLogged && 
          <Form>
            <Button variant="primary" type="submit" disabled>
              Sign In to Grab
            </Button>
          </Form>}
          {bookStatus["available"] && localStorage.getItem("user") && 
          <Form>
            <Button variant="primary" type="submit">
              Grab
            </Button>
          </Form>}
        </div>

      </div>

    </>
  );
}

export default Book;
