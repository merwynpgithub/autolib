const getElem = (className, text) => <span className={className} dangerouslySetInnerHTML={{ __html: text }}></span>;


const getAvailability = (book, user) => {
  // console.log(book.current_possessor_id, user.id);
  if (!user) return;
  let s = '';
  if (!book.status?.available) {
    if (book.current_possessor_id!==user.id) {
      if (book.status?.availableAt) {
        s = getElem("unavailable", `Available ${new Date(book.status.availableAt).toLocaleDateString()}`);
      } else {
        s = getElem("unavailable", `Available soon`);
      }
    } else {
      if (book.status?.text!=="requested") {
        s = getElem("in-my-possession", `Yours until ${new Date(book.status?.availableAt).toLocaleDateString()}`);
      } else {
        s = getElem("requested-of-me", `Requested of you`);
      }
    }
  } else {
    if (book.current_possessor_id===user.id) {
      s = getElem("in-my-possession", `In your Possession / Expired`);        
    } else {
      s = getElem("available", `Available`);
    }
  }
  return s;
}

export {
  getAvailability,
}