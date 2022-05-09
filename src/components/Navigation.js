import React, {useState} from 'react';

import { Container, Navbar, Nav, Dropdown, DropdownButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './styles/nav.scss';

function Navigation() {
  const [islogged, setLogged] = useState(localStorage.islogged);
  
  function handleClick(e) {
    //Use Local storage to set and clear logged in users
    localStorage.removeItem("islogged")
  }
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
            {islogged && <DropdownButton id="dropdown-basic-button" title="Carolin">
              <Dropdown.Item href="/" onClick={handleClick}>Logout</Dropdown.Item>
            </DropdownButton>}
          </Nav>
        </Container>

    </Navbar>
    </>
  );
}

export default Navigation;