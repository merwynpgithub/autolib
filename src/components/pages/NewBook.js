import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';

import Navigation from '../Navigation';

function NewBook() {
  let navigate = useNavigate();

  //For Submit button
  let notLogged = true;
  if (localStorage.getItem("user")) notLogged = false;
  let cover_image = "";

  function handleBlur(e) {
    const URL = "/api/openlibrary/by_isbn/";
    const isbn = e.target.value;
    const isbnURL = URL + isbn;

    axios.get(isbnURL)
      .then(res => {
        document.getElementById("title").value = res.data.title;
        document.getElementById("author").value = res.data.authors;
        document.getElementById("description").value = res.data.title;
        const bookimg = document.querySelector(".book-image");
        cover_image = res.data.coverImage;
        bookimg.innerHTML = `<img src=${cover_image} alt=${res.data.title} />`;
      });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const isbn = document.getElementById("isbn").value;
    const authors = document.getElementById("author").value;
    const title = document.getElementById("title").value;
    const description = document.getElementById("title").value;
    const genres = document.getElementById("genres").value;
    const current_possessor_id = localStorage.user.id;
    const ownerId = localStorage.user.id;
    const status = "available";

    //post book data
    axios.post("/api/resources", {isbn, title, authors, genres, description, cover_image, current_possessor_id, ownerId, status})
      .then(res => {
        //clear form
        document.getElementById("isbn").value = "";
        document.getElementById("title").value = "";
        document.getElementById("author").value = "";
        document.getElementById("description").value = "";
        
        navigate("/")})
      .catch(err => console.log(err))

  }

  return (

    <>
    <Navigation />
    <div style={
      {
        width: "90%",
        margin: "auto",
        minWidth: "350px",
        marginTop: "3em",
        display: "flex"
      }
    }
    >
      <div className="book-form" style={{width: "45%", margin: "5%"}}>
      <h2 style={{textAlign: "center"}}>Add a Book</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="isbn">
            <Form.Label>ISBN</Form.Label>
            <Form.Control type="text" placeholder="Enter ISBN" onBlur={handleBlur}/>
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Enter Title" required/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="author">
            <Form.Label>Author</Form.Label>
            <Form.Control type="text" placeholder="Enter Author"/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="genres">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" placeholder="Enter Genre" required/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
          {notLogged && <Button variant="primary" type="submit" disabled>
            Sign In to Submit
          </Button>}
          {!notLogged && <Button variant="primary" type="submit">
            Submit
          </Button>}
        </Form>
      </div>

      <div className="book-image" style={{width: "45%", margin: "5%"}}></div>
    </div>
    </>
  );
}

export default NewBook;