import React from 'react';
import {Form, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';

import Navigation from '../Navigation';

function NewBook() {

  function handleBlur(e) {
    const URL = "/api/openlibrary/by_isbn/";
    const isbn = e.target.value;
    const isbnURL = URL + isbn;

    axios.get(isbnURL)
      .then(res => {
        document.getElementById("title").value = res.data.title;
        document.getElementById("author").value = res.data.authors;
        document.getElementById("description").value = res.data.title;
      });
  }

  return (

    <>
    <Navigation />
    <div style={
      {
        width: "40%",
        margin: "auto",
        minWidth: "350px",
        marginTop: "3em"
      }
    }
    >
      <h2>New Book Form</h2>
      <Form>
        <Form.Group className="mb-3" controlId="isbn">
          <Form.Label>ISBN</Form.Label>
          <Form.Control type="text" placeholder="Enter ISBN" onBlur={handleBlur}/>
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Enter Title"/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="author">
          <Form.Label>Author</Form.Label>
          <Form.Control type="text" placeholder="Enter Author"/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
    </>
  );
}

export default NewBook;