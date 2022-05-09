import React from 'react';
import Navigation from '../Navigation';

function Home() {
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
      <p style={
        {
          fontWeight: "bold",
          fontSize: "1.5em",
          textAlign: "center"
        }
      }>Recently Added Books</p>

    </div>
    </>
    
  );
}

export default Home;
