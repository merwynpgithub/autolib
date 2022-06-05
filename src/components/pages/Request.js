import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useOutletContext, Link } from 'react-router-dom';

import {Form, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { TiTick } from "react-icons/ti";
import { BsTrash } from "react-icons/bs";

import Navigation from '../Navigation';
import '../styles/request.scss';

function Request() {
  const appData = useOutletContext();

  let navigate = useNavigate();
  const [requestData, setRequestData] = useState([]);
  const [requestRec, setRequestRec] = useState([]);
  const [openReq, setOpenReq] = useState([])

  useEffect(() => {
    axios.get("/api/requests/from_me_for_others")
    .then(res => {
      setRequestData(res.data);
    });

    axios.get("/api/requests/from_others_for_me/")
    .then(res => {
      setRequestRec(res.data);
    })
  }, [openReq])

  function handleSubmit(e, id) {
    e.preventDefault();
    const url = "/api/requests/" + id + "/complete";

    //Put request to close the open grab request
    axios.put(url, {id})
    .then(res => {
      setOpenReq(prev => [...prev, res.data.id]);
      navigate("/request");
    })
    .catch(err => console.log(err));
  }

  function handleClose(e, id) {
    e.preventDefault();
    const url = "/api/requests/" + id;

    //Delete request to undo the open grab request
    axios.delete(url)
    .then(res => {
      setOpenReq(prev => prev.pop());
      navigate("/request");
    })
    .catch(err => console.log(err));
  }

  return (
    <>
    <Navigation appData={appData}/>
    <div className="request-container" >
      <p className="request-header">Requests Sent</p>
      <div className="requests">
      {requestData.length > 0 && 
        <table>
          <tbody>
            <tr>
              <th>Book</th>
              <th>Possessor</th>
              <th>Email/Contact</th>
              <th>Date</th>
              <th>Completed/Open</th>
            </tr>
            {requestData.map(data => {
            return (
              <tr key={Math.random()}>
                <td><Link to={"/books/" + data.resource_id}>{data.resource_title}</Link></td>
                <td>{data.requestee_first_name} {data.requestee_last_name}</td>
                <td>{data.requestee_email}</td>  
                <td>{data.created_at.slice(0,10)}</td>  
                {data.completed_at ? <td className="completed">Completed</td> : 
                <td className="open">
                  Open
                  <Form style={{display:"inline", marginLeft: "1em"}} onSubmit={(e) => handleSubmit(e, data.id)}>
                    <Button variant="success" type="submit"><TiTick /></Button>
                  </Form>
                  <Form style={{display:"inline", marginLeft: "1em"}} onSubmit={(e) => handleClose(e, data.id)}>
                    <Button variant="danger" type="submit"><BsTrash /></Button>
                  </Form>
                </td> }
              </tr>
              );
            })}
          </tbody>
        </table>
        
      }
      {requestData.length === 0 && 
        <p>You have not sent any book request.</p>
      }
      </div>
    </div>

    <div className="request-container" >
      <p className="request-header">Requests Received</p>
      <div className="requests">
      {requestRec.length > 0 && 
        <table>
          <tbody>
            <tr>
              <th>Book</th>
              <th>Requester</th>
              <th>Email/Contact</th>
              <th>Date</th>
              <th>Completed/Open</th>
            </tr>
            {requestRec.map(data => {
            return (
              <tr key={Math.random()}>
                <td><Link to={"/books/" + data.resource_id}>{data.resource_title}</Link></td>
                <td>{data.requester_first_name} {data.requester_last_name}</td>
                <td>{data.requester_email}</td>
                <td>{data.created_at.slice(0,10)}</td>
                {data.completed_at ? <td className="completed">Completed</td> : 
                <td className="open">
                  Open
                </td> }
              </tr>
              );
            })}
          </tbody>            
        </table>
      }
      {requestRec.length === 0 && 
        <p>You have not received any book request.</p>
      }
      </div>
    </div>
    </>
  );
}

export default Request;
