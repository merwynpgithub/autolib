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
        <table>
          <tr>
            <th>Book</th>
            <th>Possessor</th>
            <th>Date</th>
          </tr>
        {requestData.map(data => {
          return (
            <tr key={Math.random()}>
              <td><a href={"/books/" + data.resource_id}>{data.resource_title}</a></td>
              <td>{data.requestee_first_name} {data.requestee_last_name}</td>
              <td>{data.created_at.slice(0,10)}</td>
            </tr>
            );
          })}
        </table>
        
        
        
      
      <div style={
        {marginTop: "1em"}
      }>
      </div>
    </div>
    </>
  );
}

export default Request;
