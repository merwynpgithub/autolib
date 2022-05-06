import React from 'react';

import { Container, Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FaFacebook, FaTwitter} from 'react-icons/fa';

import './styles/footer.scss';

function Footer() {
  return (
    <footer className="fixed-bottom">
      <Navbar bg="dark" variant="dark">
        <Container fluid>
          <Nav className="me-auto">
            <Nav.Link href="#contact">Contact Us</Nav.Link>
          </Nav>
          
          <Nav>
            <Nav.Link href="#connect">Connect With Us</Nav.Link>
            <Nav.Link href="/facebook.com"><FaFacebook /></Nav.Link>
            <Nav.Link href="/twitter.com"><FaTwitter /></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </footer>
  );

}

export default Footer;