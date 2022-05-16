import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

import {Form, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navigation from '../Navigation';
import '../styles/user.scss';

function User() {
  let navigate = useNavigate();
  const user = JSON.parse(localStorage.user);

  // Store the list of books currently in user's possession
  const [bookP, setBookP] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    // Save New User Form Details
    const first_name = user.first_name;
    const last_name = user.last_name;
    const email = document.getElementById("formBasicEmail").value;
    const street_address = document.getElementById("formBasicAddress").value;
    const zip_code = document.getElementById("formBasiczipCode").value;
    const province = document.getElementById("formBasicProvince").value;
    const city = document.getElementById("formBasicCity").value;
    const userData = {
      first_name,
      last_name,
      email,
      street_address,
      zip_code,
      province,
      city
    };

    // POST request
    axios.post("/api/users", userData).then(res => { // Use Local storage to set new users
      localStorage.setItem("user", JSON.stringify(userData));
      navigate("/");
    }).catch(err => console.log(err));
  }


  useEffect(() => {
    const url = "/api/resources?current_possessor_id=" + user.id;
    axios.get(url).then(res => {
      setBookP(res.data);
      console.log(res.data);
    })
  }, [])

  const booksPossessed = bookP.map(book => {
    return (
      <div key={
        book.id
      }>
        <a href={
          "/books/" + book.id
        }>
          <p className='title'>
            {
            book.title
          }</p>
        </a>
      </div>
    );
  });

  return (
    <>
      <Navigation/>
      <div className="user-container">
        <p className='header'>Your Profile</p>
        <p>Name: {user.first_name} {user.last_name}</p>
        <div>

          <div style={{display: "flex", justifyContent: "space-between"}}>
            <div className="wrapper">
            <Form onSubmit={handleSubmit}>
            <div className="user-details">
              <Form.Group className="form-input" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email"
                  placeholder={
                    user.email
                  }/>
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>

              <Form.Group className="form-input" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password"/>
              </Form.Group>
            </div>

            <div className="user-details">
              <Form.Group className="form-input" controlId="formBasicAddress">
                  <Form.Label>Street Address</Form.Label>
                  <Form.Control type="text"
                    placeholder={
                      user.street_address
                    }/>
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>

              <Form.Group className="form-input" controlId="formBasicCity">
                <Form.Label>City</Form.Label>
                <Form.Control type="text"
                  placeholder={
                    user.city
                  }/>
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>
            </div>

            <div className="user-details">
              <Form.Group className="form-input" controlId="formBasicProvince">
                <Form.Label>Province</Form.Label>
                <Form.Control type="text"
                  placeholder={
                    user.province
                  }/>
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>

              
              <Form.Group className="form-input" controlId="formBasiczipCode">
                <Form.Label>Zip Code</Form.Label>
                <Form.Control type="text"
                  placeholder={
                    user.zip_code
                  }/>
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>

            </div>

            <Form.Group className="form-input" controlId="formBasicPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="number" placeholder="Enter phone no"/>
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>

            <Button class="button" type="submit">
              SAVE
            </Button>
          </Form>
            </div>
 
          </div>
          <div className='possessions'>
            <p className='header'>Books in your Possession</p>
            {booksPossessed}
          </div> 
        </div>

        
      </div>
      
    </>
  );
}

export default User;
