import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import {Form, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navigation from '../Navigation';
import '../styles/request.scss';

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
    <div className="request-container" >
        <p className="request-header">Requests Sent</p>
        <div className="request">{requestData.map(data => {
          return (
            <div key={Math.random()}>
              <p><span className="">Book:</span> <a href={"/books/" + data.resource_id}>{data.resource_title}</a></p>
              <p><span>Current Borrower:</span> {data.requestee_first_name} {data.requestee_last_name}</p>
              <p><span>Requested on:</span> {data.created_at.slice(0,10)}</p>
          </div>
          );
        })}
        
        
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
