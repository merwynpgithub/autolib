import React from 'react';

import { Container, Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './styles/nav.scss';

function Navigation() {
  return (
    <>
    <Navbar bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand href="/">AutoLib</Navbar.Brand>

        <Nav className="me-auto">
          <Nav.Link href="#home">About</Nav.Link>
          <Nav.Link href="#features">Grab A Book</Nav.Link>
        </Nav>

        <Nav>
          <Nav.Link href="#login">Sign In</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
    </>
  );
}

export default Navigation;