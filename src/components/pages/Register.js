import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

import {Form, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function Register() {
  const appData=useOutletContext();
  const [err, setErr] = useState("");
  let navigate = useNavigate();
  
  function handleSubmit(e) {
    e.preventDefault();

    //Save New User Form Details
    const first_name = document.getElementById("firstName").value;
    const last_name = document.getElementById("lastName").value;
    const email = document.getElementById("formBasicEmail").value;
    const user = { first_name, last_name, email };

    //POST request
    axios.post("/api/users", user)
      .then(res => {
        appData.login({email})
        .then(res => {
          navigate("/");
        })
      })
      .catch(err => setErr("Please Register and fill required fields"));
  }

  return (
    <div style={
      {
        width: "40%",
        margin: "auto",
        minWidth: "350px",
        marginTop: "3em"
      }
    }>
      <p style={
        {
          fontWeight: "bold",
          fontSize: "1.5em"
        }
      }>Sign Up</p>
      {err && <p style={{color: "red", fontWeight: "bold"}}>{err}</p>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" placeholder="Enter first name" required/>
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" placeholder="Enter last name" required/>
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" required/>
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password"/>
        </Form.Group>
        {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out"/>
        </Form.Group> */}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <div style={
        {marginTop: "1em"}
      }></div>
    </div>
  );
}

export default Register;
