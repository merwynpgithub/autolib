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
      <p>AutoLib aims at combining the concept of peer to peer sharing with a traditional functionality of a library.</p>

    </div>
    </>
  );
}

export default About;