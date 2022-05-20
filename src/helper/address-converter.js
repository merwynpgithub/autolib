function addressConverter(currentBook) {

  let street_address = currentBook.street_address;
  let zip_code = currentBook.zip_code;
  const city = currentBook.city;
  const province = currentBook.province;
  // street_address = street_address.trim();
  street_address = street_address.replaceAll(" ", "%20");
  zip_code = zip_code.replaceAll(" ", "%20");

  
  let urlSrc= "https://maps.google.com/maps?q=";
  urlSrc += street_address;
  urlSrc += "%20" + city + "%20";
  urlSrc += zip_code + "%20";
  urlSrc += province;
  urlSrc += "&t=&z=13&ie=UTF8&iwloc=&output=embed";
   

  return urlSrc;

  
}

export default addressConverter;