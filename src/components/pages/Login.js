import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  let navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const email = document.getElementById("formBasicEmail").value;
    const loginData = { email };

    axios.post("/login", loginData)
    .then(res => {

      //Use Local storage to set and clear logged in users
     localStorage.setItem("islogged", true);
     localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/");
    });
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
      }>Login</p>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email"/>
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password"/>
        </Form.Group>
        
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <div style={
        {marginTop: "1em"}
      }>
        <p>First time here:
          <a href="/register">Sign Up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
