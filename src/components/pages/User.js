import React from 'react';

import {Form, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navigation from '../Navigation';
import '../styles/user.scss';

function User() {
  const user = JSON.parse(localStorage.user);

  return (
    <>
    <Navigation />
    <div className="user-container" >
      <p className="user-header">{user.first_name} {user.last_name}</p>
      <div className="user-details">
        <p><span className="name">First Name:</span> {user.first_name}</p>
        <p><span className="name">Last Name:</span>  {user.last_name}</p>
      </div>
      <Form>
      <div className="user-details">
      <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder={user.email}/>
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicAddress">
          <Form.Label>Street Address</Form.Label>
          <Form.Control type="text" placeholder={user.street_address}/>
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
      </div>
        
      <div className="user-details">
      <Form.Group className="mb-3" controlId="formBasiczipCode">
          <Form.Label>Street Zip Code</Form.Label>
          <Form.Control type="text" placeholder={user.zip_code}/>
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCity">
          <Form.Label>Street City</Form.Label>
          <Form.Control type="text" placeholder={user.city}/>
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
      </div>
        
      <div className="user-details">
        <Form.Group className="mb-3" controlId="formBasicProvince">
          <Form.Label>Province</Form.Label>
          <Form.Control type="text" placeholder={user.province}/>
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
    </>
  );
}

export default User;
