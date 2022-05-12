import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navigation from '../Navigation';

function Book() {
  const [bookDetails, setBookDetails] = useState({});

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
    });
  }, [])

  return (
    <>
      <Navigation/>
      <div style={
        {
          width: "75%",
          margin: "auto",
          minWidth: "350px",
          marginTop: "3em",
          display: "flex",
          justifyContent: "space-around"
        }
      }>
        <div>
          <img src={
              bookDetails.cover_image
            }
            alt={
              bookDetails.title
            }
            style={
              {height: "350px"}
            }/>
        </div>

        <div style={{marginLeft: "2em"}}>
        <p>{bookDetails.title}</p>
        <p>ISBN: {bookDetails.isbn}</p>
        <p>{bookDetails.description}</p>
        <p>Authors: {bookDetails.authors}</p>
        <p>Genres: {bookDetails.genres}</p>
        </div>

      </div>

    </>
  );
}

export default Book;
