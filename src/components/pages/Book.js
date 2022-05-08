import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Book() {
  const [bookDetails, setBookDetails] = useState({});

  const parameter = useParams();
  const bookId = Number(parameter.bookId);

  useEffect(() => {
    axios.get("/api/resources").then(res => {
      const bookArray = res.data;
      const renderedBook = bookArray.filter(book => book.id === bookId);
      console.log(renderedBook);
      setBookDetails(renderedBook[0]);
    });
  }, [])
  return (
    <>
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

        <div style={
          {marginLeft: "2em"}
        }>
          <p style={
            {fontSize: "1.5em"}
          }>
            {
            bookDetails.title
          }</p>
          <p style={
            {fontSize: "1.2em"}
          }>ISBN: {
            bookDetails.isbn
          }</p>
          <p>{
            bookDetails.description
          }</p>
          <p>Authors: {
            bookDetails.authors
          }</p>
          <p>Genres: {
            bookDetails.genres
          }</p>
          <p>Status: {
            bookDetails.status
          }</p>
          {
          bookDetails.status === "available" && <form>
            <Button variant="primary" type="submit">
              Grab
            </Button>
          </form>
        } </div>

      </div>

    </>
  );
}

export default Book;
