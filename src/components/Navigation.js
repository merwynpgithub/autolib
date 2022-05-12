import React, {useState} from 'react';

import { Container, Navbar, Nav, Dropdown, DropdownButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './styles/nav.scss';

function Navigation() {
  const [islogged, setLogged] = useState(localStorage.islogged);

  function handleClick(e) {
    //Use Local storage to set and clear logged in users
    localStorage.removeItem("islogged");
    localStorage.removeItem("user");
  }
  return (
    <>
    <Navbar className='navbar'>
        <Container fluid>
          <div className='sec_1'>
            <img src="/logo.png" alt="autolib logo" className='logo'/>
            <Nav className="nav_links">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
              <Nav.Link href="/books">Grab A Book</Nav.Link>
            </Nav>
          </div>

          <Nav>
            <Nav.Link href="/new">Add Book</Nav.Link>
            {!islogged && <Nav.Link href="/login">Sign In</Nav.Link>}
            {islogged && localStorage.getItem("user")&& <DropdownButton id="dropdown-basic-button" title={JSON.parse(localStorage.user)["first_name"]}>
              <Dropdown.Item href="/user">Profile</Dropdown.Item>
              <Dropdown.Item href="/request">Requests</Dropdown.Item>
              <Dropdown.Item href="/" onClick={handleClick}>Logout</Dropdown.Item>
            </DropdownButton>}
          </Nav>
        </Container>

    </Navbar>
    </>
  );
}

export default Navigation;