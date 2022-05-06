import React from 'react';

import { Container, Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Footer() {
  return (
    <footer className="fixed-bottom">
      <Navbar bg="dark" variant="dark">
        <Container fluid>
            <Navbar.Brand>Footer</Navbar.Brand>
        </Container>
      </Navbar>
    </footer>
  );

}

export default Footer;