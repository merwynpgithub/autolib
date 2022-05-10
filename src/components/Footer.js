import React from 'react';

import {Container, Navbar, Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FaFacebook, FaTwitter, FaGithub} from 'react-icons/fa';

import './styles/footer.scss';

function Footer() {
  const tooltip = "AutoLib is a way of sharing books among closely knit community members";
  return (
    <footer className="fixed-bottom">
      <Navbar bg="dark" variant="dark">
        <Container fluid>
          <Nav className="me-auto">
            <p className="footer-text" title={tooltip}>Contact Us</p>
          </Nav>

          <Nav>
            <p className="footer-text">Connect With Us</p>
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
