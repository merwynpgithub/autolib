import React from 'react';

import {Container, Navbar, Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FaFacebook, FaTwitter, FaGithub} from 'react-icons/fa';

import './styles/footer.scss';

function Footer() {
  return (
    <footer className="fixed-bottom">
      <Navbar bg="dark" variant="dark">
        <Container fluid>
          <Nav className="me-auto">
            <Nav.Link href="/contact">Contact Us</Nav.Link>
          </Nav>

          <Nav>
            <p style={
              {
                color: "rgba(255,255,255,.55)",
                paddingTop: "0.75em",
                paddingRight: "1.5em"
              }
            }>Connect With Us</p>
            <Nav.Link href="http://www.facebook.com"><FaFacebook/></Nav.Link>
            <Nav.Link href="http://www.twitter.com"><FaTwitter/></Nav.Link>
            <Nav.Link href="http://www.github.com"><FaGithub/></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </footer>
  );

}

export default Footer;
