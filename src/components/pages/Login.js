import React, { useState } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';

import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  const [err, setErr] = useState("")
  const appData = useOutletContext();
  let navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const email = document.getElementById("formBasicEmail").value;
    appData.login({email})
      .then(() => navigate("/books"))
      .catch(err => setErr("Invalid username/password. Please enter correct username or register."));
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
      {err && <p style={{color: "red", fontWeight: "bold"}}>{err}</p>}
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
          <Link to="/register" style={{margin: "1.5em"}}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
