import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/books.scss';

import axios from 'axios';

import Navigation from '../Navigation';
import Footer from '../Footer';

const defaultImageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqlyVgjqhw65UtsRfTi-zafiSFb7zitbpQAjcrlqKZcCgBiDyWv4MV4CbgVcxFlXtf-8I&usqp=CAU";
let cover_image;

function NewBook() {
  let navigate = useNavigate();
  const appData = useOutletContext();

  function handleBlur(e) {
    const URL = "/api/openlibrary/by_isbn/";
    const isbn = e.target.value;
    const isbnURL = URL + isbn;

    const bookimg = document.querySelector(".book-image");


    axios.get(isbnURL)
      .then(res => {
        const isbn_error = document.querySelector(".isbn-error");
        isbn_error.textContent = '';
        document.getElementById("title").value = res.data.title;
        document.getElementById("author").value = res.data.authors;
        document.getElementById("description").value = res.data.title;
        cover_image = res.data.cover_image;
        if (cover_image !== undefined){
          bookimg.innerHTML = `<img src=${cover_image} alt=${res.data.title} />`;
        }
        
      })
      .catch(() => {
        const isbn_error = document.querySelector(".isbn-error");
        const error_message = "We couldn't find that ISBN. Please, enter the book details manually.";
        isbn_error.textContent = error_message;
      })
  }

  function handleSubmit(e) {
    e.preventDefault();

    const isbn = document.getElementById("isbn").value;
    const authors = document.getElementById("author").value;
    const title = document.getElementById("title").value;
    const description = document.getElementById("title").value;
    const genres = document.getElementById("genres").value;
    const current_possessor_id = appData.user.id;
    const ownerId = appData.user.id;
    const status = "available";

    //post book data
    axios.post("/api/resources", {isbn, title, authors, genres, description, cover_image, current_possessor_id, ownerId, status})
      .then(res => {
        //clear form
        
        document.getElementById("isbn").value = "";
        document.getElementById("title").value = "";
        document.getElementById("author").value = "";
        document.getElementById("description").value = "";
        
        const newBookUrl = "/books/" + res.data.id;
        navigate(newBookUrl)})
      .catch(err => console.log(err))

  }


  return (

    <>
    <Navigation appData={appData} />
    <div className='add-a-book'>
      <div className="book-form">
      <h2>ADD A BOOK</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="isbn">
            <Form.Label>ISBN</Form.Label>
            <Form.Control type="text" placeholder="Enter ISBN and hit the tab button" onBlur={handleBlur}/>
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>

          <p className='isbn-error'></p>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Enter Title" required/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="author">
            <Form.Label>Author</Form.Label>
            <Form.Control type="text" placeholder="Enter Author"/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="genres">
            <Form.Label>Genres</Form.Label>
            <Form.Control type="text" placeholder="Enter Genre" required/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
          {!appData.isLoggedIn && <Button className='button' type="submit" disabled>
            Sign In to Submit
          </Button>}
          {appData.isLoggedIn && <Button className='button' type="submit">
            Submit
          </Button>}
        </Form>
      </div>

      <div className="book-image">
        <img src={ defaultImageUrl } alt="Placeholder for Cover" />
      </div>
    </div>
    <Footer />
    </>
  );
}

export default NewBook;