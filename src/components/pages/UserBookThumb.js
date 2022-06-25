import React from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { getAvailability } from "../../helper/book-utilities";
const UserBookThumb = props => {
  const appData = useOutletContext();
  const navigate = useNavigate();

  const { book } = props;

  //This is a workaround. For some reason using the <Link> component instead of <a> causes errors.
  const navToBookPage = (e) => {
    e.preventDefault();
    navigate(`/books/${book.id}`);
  }

  return(
    <div className="book" key={book.id}>
      <a href={"/books/" + book.id} onClick={navToBookPage}><img src={book.cover_image || '/no-photo-available.png'} alt={book.title} loading="lazy" /></a> 
      <p className='title'>{book.title}</p>
      {getAvailability(book, appData.user, true)}
    </div>
  )
};

export default UserBookThumb;