import React from "react";
import { getAvailability } from "../../helper/book-utilities";
const UserBookThumb = props => {
  const { book } = props;

  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : undefined;

  return(
    <div className="book" key={book.id}>
      <a href={"/books/" + book.id}><img src={book.cover_image || '/no-photo-available.png'} alt={book.title} loading="lazy" /></a>
      <p className='title'>{book.title}</p>
      {getAvailability(book, user, true)}
    </div>
  )
};

export default UserBookThumb;