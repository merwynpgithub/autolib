import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import {useParams} from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navigation from '../Navigation';
import '../styles/book.scss';
import addressConverter from '../../helper/address-converter';

function Book() {
  let navigate = useNavigate();
  const [bookDetails, setBookDetails] = useState({});
  const [status, setStatus] = useState({});
  const [hasBook, setHasBook] = useState(false);
  const [mapUrl, setMapUrl] = useState("");

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
      navigate("/request");
    })
    .catch(err => console.log(err));
  }
  useEffect(() => {
    //Load the single Book
    const url = "/api/resources/" + bookId;
    axios.get(url).then(res => {
      setBookDetails(res.data);
      setStatus(res.data.status);

      //Check if user has that book
      if (localStorage.getItem("user")) {
        const user = JSON.parse(localStorage.user);

        const url = "/api/resources?current_possessor_id=" + user.id;
        axios.get(url).then(data => {
          const booksPossessed = data.data;
          const currentBook = res.data;
          //Update if user has book
          const doesHaveBook = booksPossessed.filter(book => book.id === currentBook.id);
          doesHaveBook.length >= 1 ? setHasBook(true) : setHasBook(false);

          //Show the book location in a map
          const urlSrc = addressConverter(res.data);
          setMapUrl(urlSrc);
        })

      }
      
    });
  }, [bookId])

  const defaultImageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqlyVgjqhw65UtsRfTi-zafiSFb7zitbpQAjcrlqKZcCgBiDyWv4MV4CbgVcxFlXtf-8I&usqp=CAU";

  return (
    <>
      <Navigation/>
      <div className='book_wrapper'>
        <div className='section_1'>
          <img 
            src={bookDetails.cover_image || defaultImageUrl}
            alt={bookDetails.title}
          />
        </div>

        <div className='section_2'>
          <p id="title">{bookDetails.title}</p>
          <p className='bold author'>by {bookDetails.authors}</p>
          <br />
          <p><span className="bold">GENREs:</span> {bookDetails.genres}</p>
          <p><span className="bold">ISBN:</span> {bookDetails.isbn}</p>
          <p><span className="bold">Status:</span> {status.text}</p>
          <br />
          <p>{bookDetails.description}</p>
          {status.text === "available" && notLogged && 
          <Form>
            <Button variant="primary" type="submit" disabled>
              Sign In to Grab
            </Button>
          </Form>}
          {status.text === "available" && localStorage.getItem("user") && !hasBook &&
          <Form onSubmit={handleSubmit}>
            <Button className='button' type="submit">
              Get This Book
            </Button>
          </Form>}
          {hasBook && <p className="in-possession">This Book is in your possession</p>}
          {status.availableAt && <p className="in-possession">This book will be available on {status.availableAt.slice(0,10)}</p>}
        </div>
        <div>
        {localStorage.getItem("user") && !hasBook && <div>
          <p className="bold">Book Location:</p>
          <iframe style={{width: "300px", height: "300px"}} id="gmap_canvas" src={mapUrl}></iframe>
        </div>}
        
        </div>

      </div>

    </>
  );
}

export default Book;
