import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

import {useParams} from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navigation from '../Navigation';
import '../styles/book.scss';
import addressConverter from '../../helper/address-converter';
import { getAvailability } from '../../helper/book-utilities';
import Footer from '../Footer';

function Book() {
  const appData = useOutletContext();
  const navigate = useNavigate();

  const [bookDetails, setBookDetails] = useState({});
 
  const parameter = useParams();
  const bookId = Number(parameter.bookId);
  
  function handleSubmit(e) {
    e.preventDefault();
    axios.post("/api/requests", { "resourceId": bookId })
    .then(res => {
      navigate("/request");
    })
    .catch(err => console.log(err));
  }

  useEffect(() => {
    //Load the single Book
    const url = "/api/resources/" + bookId;
    axios.get(url).then(res => {
      const record = res.data;
      const newBookDetails = { 
        ...record, 
        status: { ...record.status },
        userHasBook: record.current_possessor_id === appData.user?.id,
        mapUrl: addressConverter(record),
      };
      setBookDetails(newBookDetails);      
    });
  }, [bookId, appData.user])

  const defaultImageUrl = "/no-photo-available.png";

  if (bookDetails.id) {

    return (
      <>
        <Navigation appData={appData}/>
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
                <div className="status-info">{getAvailability(bookDetails, appData.user)}</div>
              </div>
              <div className='inner_2'>
                {bookDetails.status.available && !appData.isLoggedIn && 
                  <Form>
                    <Button className='button' type="submit" disabled>
                      Sign In to Request
                    </Button>
                  </Form>}
                {bookDetails.status.available && appData.isLoggedIn && !bookDetails.userHasBook &&
                  <Form onSubmit={handleSubmit}>
                    <Button className='button' type="submit">
                      Get This Book
                    </Button>
                  </Form>}
              </div>
            </div>
            {appData.isLoggedIn && !bookDetails.userHasBook && <div>
              <p className="bold">Book Location:</p>
              <br />
              <iframe title="Book Location" style={{width: "100%", height: "300px"}} id="gmap_canvas" src={bookDetails.mapUrl}></iframe>
            </div>}
          </div>
  
        </div>
        <Footer />
      </>
    );
  }

}

export default Book;
