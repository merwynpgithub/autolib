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
  const [requestData, setRequestData] = useState([]);

  useEffect(() => {
    axios.get("/api/requests/from_me_for_others")
    .then(res => {
      console.log("From me for others", res.data);
      setRequestData(res.data);
    });

    axios.get("/api/requests/from_others_for_me/")
    .then(res => {
      console.log("From others for me",res.data);
    })
  }, [])
  
  

  return (
    <>
    <Navigation />
    <div className="user-container" >
      <p className="user-header">{user.first_name} {user.last_name}</p>
      <div className="user-details">
      <div>{requestData.map(data => {
          return (
            <div key={Math.random()}>
              <p><span className="name">Book:</span> {data.resource_id}</p>
              <p><span>Requested on:</span> {data.created_at.slice(0,10)}</p>
            </div>
          );
        })}
      </div>
        <div><span className="name">Requests received:</span>  {user.last_name}</div>
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
