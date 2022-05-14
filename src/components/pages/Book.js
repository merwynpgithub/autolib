import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import {useParams} from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navigation from '../Navigation';
import '../styles/book.scss';

function Book() {
  let navigate = useNavigate();
  const [bookDetails, setBookDetails] = useState({});
  const [status, setStatus] = useState({});

  // For Grab button
  let notLogged = true;
  if (localStorage.getItem("user")) notLogged = false;

  const parameter = useParams();
  const bookId = Number(parameter.bookId);
  
  function handleSubmit(e) {
    e.preventDefault();
    console.log(bookId);

    axios.post("/api/requests", { "resourceId": bookId })
    .then(res => {
      console.log("post api request", res);
      navigate("/");
    })
    .catch(err => console.log(err));

  }
  useEffect(() => {
    const url = "/api/resources/" + bookId;
    axios.get(url).then(res => {
      // const bookArray = res.data;
      // const renderedBook = bookArray.filter(book => book.id === bookId);
      setBookDetails(res.data);
      setStatus(res.data.status)
      console.log(res.data.status);
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
              {height: "350px", 
              backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqlyVgjqhw65UtsRfTi-zafiSFb7zitbpQAjcrlqKZcCgBiDyWv4MV4CbgVcxFlXtf-8I&usqp=CAU')",
              backgroundRepeat: "no-repeat"}
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
          <p style={{width: "90%", aspectRatio: "2/1", overflowY: "scroll"}}>{
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
            status.text
          }</p>
          {
          status.text === "available" && notLogged && <Form>
            <Button variant="primary" type="submit" disabled>
              Sign In to Grab
            </Button>
          </Form>
        }
          {
          status.text === "available" && localStorage.getItem("user") && <Form onSubmit={handleSubmit}>
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
