import React from "react";
import { useOutletContext } from "react-router-dom";
import { getAvailability } from "../../helper/book-utilities";
const UserBookThumb = props => {
  const appData = useOutletContext();
  const { book } = props;

  return(
    <div className="book" key={book.id}>
      <a href={"/books/" + book.id}><img src={book.cover_image || '/no-photo-available.png'} alt={book.title} loading="lazy" /></a>
      <p className='title'>{book.title}</p>
      {getAvailability(book, appData.user, true)}
    </div>
  )
};

export default UserBookThumb;