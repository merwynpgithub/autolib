import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Navigation from '../Navigation';
import '../styles/books.scss';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import "swiper/css/effect-cards";

import { EffectCards } from "swiper";


function Home() {
  const [book, setBook] = useState([]);

  useEffect(() => {
    axios.get("/api/resources?limit=5").then(res => setBook(res.data));
  }, [])

  const bookList = book.map(book => {
    return (
        <SwiperSlide><img src={book.cover_image} alt={book.title} /></SwiperSlide>
     
      // <div className="book-list" key={book.id}>
      //   <img src={book.cover_image} alt={book.title} />
      // </div>
    );
  });

  return (
    <>
    <Navigation />
    <div className="hero" >
      <div className='section_1'>
        <p className='header'>A NEW WAY TO READ</p>
        <p>Browse and request your favourite books in your neighbourhood. Pick them up at your convenience, and pass them on once you’re done reading. It’s that simple!</p><br />
        <p>Swipe through the books on the right to view the latest additions to the decentralized library.</p>
        <img src="/arrow.gif" alt="arrow" />
      </div>
      <Swiper
          effect={"cards"}
          modules={[EffectCards]}
          className="mySwiper section_2"
          key={book.id}
        >{bookList} </Swiper>
    </div>
    <main>
      <p className='header'>HOW IT WORKS</p>
      <div className='wrapper'>
        <div className='container'>
          <div className='white_back'><img src="/search.png" /></div>
          <p className='subheader'>Find A Book</p>
          <p>Look through the endless collection of books in the library, and select one you’re excited to read</p>
        </div>
        <div className='container'>
          <div className='white_back'><img src="/transaction.png" /></div>
          <p className='subheader'>Make The Request</p>
          <p>Request the book from the current possessor, and wait for the your request to be accepted</p>
        </div>
        <div className='container'>
          <div className='white_back'><img src="/open-book.png" /></div>
          <p className='subheader'>Pick It Up</p>
          <p>Make arrangements for pick up at an arranged and convenient location. Share the love by uploading a book or two!</p>
        </div>
      </div>
    </main>
    </>
    
  );
}

export default Home;
