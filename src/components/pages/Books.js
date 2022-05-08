import axios from 'axios';
import React, {useState, useEffect} from 'react';

function Books() {
  const [book, setBook] = useState([]);

  useEffect(() => {
    axios.get("/api/resources").then(res => setBook(res.data));
  }, [])

  const bookList = book.map(book => {
    return (
      <div key={
          book.id
        }
        style={
          {margin: "10px"}
      }>
        <img src={
            book.cover_image
          }
          alt={
            book.title
          }
          style={
            {height: "250px"}
          }/>
          <p>{book.title}</p>
      </div>
    );
  });

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
        <div style={
          {
            width: "75%",
            aspectRatio: "2/3",
            margin: "auto",
            display: "flex"
          }
        }>
          {bookList} 
        </div>
      </div>
    </>
  );
}

export default Books;
