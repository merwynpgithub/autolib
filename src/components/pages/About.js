import React from 'react';
import Navigation from '../Navigation';
import { useOutletContext } from 'react-router-dom';
import '../styles/about.scss';

function About() {
  const appData = useOutletContext();

  return (
    <>
    <Navigation appData={appData}/>
    <main className='about-main'>
      <div className='about-header'>
        <h1>ABOUT US</h1>
      </div>
      <div className='about'>
        <div>
          <h2>About AutoLib</h2>
          <p>AutoLib is a local community library founded with the purpose of serving local community members in an automated way without relying on a storage space and a central library building. The app aims to combine the concept of peer to peer sharing with the traditional functionality of a library.</p>
          <p>AutoLib was created using PostgreSQL for the database, Express JS as the backend framework, OpenLibrary API for adding books, Swiper JS, React JS, React-Bootstrap for the frontend, and Node.js as the runtime.</p>
        </div>
        <div>
          <img src="/bookshelf.png" alt="AutoLib bookshelf" className='bookshelf'/>
        </div>
      </div>
      <div className='about'>
        <div>
          <img src="/LHL_photo.jpg" alt="AutoLib Lighthouse Labs" className='lhl'/>
        </div>
        <div>
          <h2>About The Creators</h2>
          <p>Merwyn, Johannes and Chérie are web developers residing in Windsor, ON, Vancouver, BC and St. John's, NL, and are soon to be graduands from Lighthouse Labs - Canada's leading coding bootcamp. They decided to work together to create AutoLib as their final project. </p>
        </div>
      </div>
    </main>
    </>
  );
}

export default About;