import React from 'react';

import { Container, Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './styles/nav.scss';

function Navigation() {
  const islogged = false;
  return (
    <>
    <Navbar bg="dark" variant="dark">
        <Container fluid>
          <Navbar.Brand href="/">AutoLib</Navbar.Brand>

          <Nav className="me-auto">
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/books">Grab A Book</Nav.Link>
          </Nav>

          <Nav>
            <Nav.Link href="/new">Add Book</Nav.Link>
            {!islogged && <Nav.Link href="/login">Sign In</Nav.Link>}
            {islogged && <Nav.Link href="/user">Carolin</Nav.Link>}
          </Nav>
        </Container>

    </Navbar>
    </>
  );
}

export default Navigation;