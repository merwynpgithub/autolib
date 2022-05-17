import React from 'react';
import Navigation from '../Navigation';

import '../styles/about.scss';

function About() {
  return (
    <>
    <Navigation />
    <div style={
      {
        width: "75%",
        margin: "auto",
        minWidth: "350px",
        marginTop: "3em"
      }
    }>
      <h1 id="grab">ABOUT AUTOLIB</h1>
      <p>AutoLib is a local community library founded with the purpose of serving local community members in an automated way without relying on a storage space and a central library building. </p>
      <p>AutoLib aims at combining the concept of peer to peer sharing with a traditional library.</p>
      <p>We are a group of welcoming people residing in Greater Vancouver Area about 45 minutes away from the Aiport.</p>
      
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48493.30097439324!2d-123.07161592599768!3d49.24306693704039!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x548673e773b4223f%3A0x4a921ed8590f5389!2s356%2010th%20Avenue%20Bikeway%2C%20Vancouver%2C%20BC%20V5Y%201S3!5e0!3m2!1sen!2sca!4v1652801224298!5m2!1sen!2sca" style ={{width: "400px", height: "400px", border: "0"}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

    </div>
    </>
  );
}

export default About;