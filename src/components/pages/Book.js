import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import {useParams} from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navigation from '../Navigation';
import '../styles/book.scss';
import addressConverter from '../../helper/address-converter';
import { getAvailability } from '../../helper/book-utilities';

function Book() {
  let navigate = useNavigate();
  const [bookDetails, setBookDetails] = useState({});
  const [status, setStatus] = useState({});
  const [hasBook, setHasBook] = useState(false);
  const [mapUrl, setMapUrl] = useState("");
  let user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : undefined;

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
      const record = res.data;
      const newBookDetails = { ...record, status: { ...record.status }};
      setBookDetails(newBookDetails);
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
          <div className='inner'>
            <div className='inner_1'>
              <p className='bold author'>by {bookDetails.authors}</p>
              <br />
              <p><span className="bold">Genre(s):</span> {bookDetails.genres}</p>
              <p><span className="bold">ISBN:</span> {bookDetails.isbn}</p>
              
              <br />
              <p>{bookDetails.description}</p>
              <div className="status-info">{getAvailability(bookDetails, user)}</div>
            </div>
            <div className='inner_2'>
              {status.text === "available" && notLogged && 
                <Form>
                  <Button className='button' type="submit" disabled>
                    Sign In to Request
                  </Button>
                </Form>}
                {status.text === "available" && localStorage.getItem("user") && !hasBook &&
                <Form onSubmit={handleSubmit}>
                  <Button className='button' type="submit">
                    Get This Book
                  </Button>
                </Form>}
            </div>
          </div>
          {localStorage.getItem("user") && !hasBook && <div>
            <p className="bold">Book Location:</p>
            <br />
            <iframe style={{width: "100%", height: "300px"}} id="gmap_canvas" src={mapUrl}></iframe>
          </div>}
        </div>

      </div>

    </>
  );
}

export default Book;
