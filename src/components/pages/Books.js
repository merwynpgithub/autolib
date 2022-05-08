import axios from 'axios';
import React, { useState, useEffect } from 'react';

function Books() {
  const [book, setBook] = useState([]);
  
  useEffect(() => {
    axios.get("/api/resources").then(res=> setBook(res.data));
  }, [])

  return (
    <>
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
        }>Grab a Book</p>
        <div>
          <img src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1566425108l/33.jpg" alt="lord of the rings"
            style={
              {height: "250px"}
            }/>
        </div>
        
      </div>
    </>
  );
}

export default Books;
