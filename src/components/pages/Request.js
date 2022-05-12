import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import {Form, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navigation from '../Navigation';
import '../styles/user.scss';

function Request() {
  let navigate = useNavigate();
  const user = JSON.parse(localStorage.user);

  useEffect(() => {
    axios.get("/api/requests/from_me_for_others")
    .then(res => console.log(res.data));
  }, [])
  
  

  return (
    <>
    <Navigation />
    <div className="user-container" >
      <p className="user-header">{user.first_name} {user.last_name}</p>
      <div className="user-details">
        <p><span className="name">First Name:</span> {user.first_name}</p>
        <p><span className="name">Last Name:</span>  {user.last_name}</p>
      </div>
      
      <div style={
        {marginTop: "1em"}
      }>
      </div>
    </div>
    </>
  );
}

export default Request;
