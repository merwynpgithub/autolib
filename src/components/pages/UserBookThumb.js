import React from "react";

const UserBookThumb = props => {
  const { book } = props;

  const availability = book.status?.availableAt
  ? <span className='text-success'>expires {new Date(book.status?.availableAt).toLocaleDateString()}</span>
  : <span className='text-warning'>expired/in library</span>

  return(
    <div className="book" key={book.id}>
      <a href={"/books/" + book.id}><img src={book.cover_image || '/no-photo-available.png'} alt={book.title} loading="lazy" /></a>
      <p className='title'>{book.title}</p>
      <p>{availability}</p>
    </div>
  )
};

export default UserBookThumb;