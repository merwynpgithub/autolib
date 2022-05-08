import React from 'react';

import {Form, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function User() {
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
          fontSize: "1.5em",
          textAlign: "center"
        }
      }>Carolin McDonald</p>
      <div style={{display: "flex"}}>
        <p style={{padding: "0 1em 0 0"}}>First Name: Carolin</p>
        <p style={{padding: "0 0 0 1em"}}>Last Name: McDonald</p>
      </div>
      <Form>
      <div style={{display: "flex"}}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email"/>
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicAddress">
          <Form.Label>Street Address</Form.Label>
          <Form.Control type="text" placeholder="Enter street address"/>
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
      </div>
        
      <div style={{display: "flex"}}>
      <Form.Group className="mb-3" controlId="formBasiczipCode">
          <Form.Label>Street Zip Code</Form.Label>
          <Form.Control type="text" placeholder="Enter zip code"/>
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCity">
          <Form.Label>Street City</Form.Label>
          <Form.Control type="text" placeholder="Enter city"/>
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
      </div>
        
      <div style={{display: "flex"}}>
        <Form.Group className="mb-3" controlId="formBasicProvince">
          <Form.Label>Province</Form.Label>
          <Form.Control type="text" placeholder="Enter province"/>
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPhone">
          <Form.Label>Phone</Form.Label>
          <Form.Control type="number" placeholder="Enter phone no"/>
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
      </div>
        

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password"/>
        </Form.Group>
        
        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
      <div style={
        {marginTop: "1em"}
      }>
      </div>
    </div>
  );
}

export default User;
