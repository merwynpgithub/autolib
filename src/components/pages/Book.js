import React from 'react';
import { useParams } from 'react-router-dom';

function Book() {
  const parameter = useParams();
  console.log(parameter);
  return (
    <p>This is book {parameter.bookId}</p>
  );
}

export default Book;