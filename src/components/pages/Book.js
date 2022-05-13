import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navigation from '../Navigation';
import '../styles/book.scss';

function Book() {
  const [bookDetails, setBookDetails] = useState({});

  // For Grab button
  let notLogged = true;
  if (localStorage.getItem("user")) notLogged = false;

  function handleSubmit(e) {
    e.preventDefault();
    console.log("works");
  }
  


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
        <div style={
          {width: "40%"}
        }>
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

        <div style={
          {
            marginLeft: "2em",
            width: "60%"
          }
        }>
          <p id="title-name">
            {
            bookDetails.title
          }</p>
          <p>
            <span className="bold">ISBN:</span>
            {
            bookDetails.isbn
          }</p>
          <p>{
            bookDetails.description
          }</p>
          <p>
            <span className="bold">Authors:</span>
            {
            bookDetails.authors
          }</p>
          <p>
            <span className="bold">Genres:</span>
            {
            bookDetails.genres
          }</p>
          <p>
            <span className="bold">Status:</span>
            {
            bookDetails.status
          }</p>
          {
          bookDetails.status === "available" && notLogged && <Form>
            <Button variant="primary" type="submit" disabled>
              Sign In to Grab
            </Button>
          </Form>
        }
          {
          bookDetails.status === "available" && localStorage.getItem("user") && <Form onSubmit={handleSubmit}>
            <Button variant="primary" type="submit">
              Grab
            </Button>
          </Form>
        } </div>

      </div>

    </>
  );
}

export default Book;
