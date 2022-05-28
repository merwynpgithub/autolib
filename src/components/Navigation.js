import React, {useState} from 'react';

import { Container, Navbar, Nav, Dropdown, DropdownButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './styles/nav.scss';
import axios from 'axios';

function Navigation({appData}) {
  const [receivedRequests, setReceivedRequests] = useState("");
  if (localStorage.getItem("user")) {
    axios.get("/api/requests/from_others_for_me")
    .then(res => {
      const openRequests = res.data.filter(req => req.completed_at === null);
      if (openRequests.length >= 1) setReceivedRequests(openRequests.length);
    })
    .catch(err => console.log(err));
  }

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
              <Nav.Link href="/books">Catalogue</Nav.Link>
            </Nav>
          </div>

          <Nav>
            {!appData?.isLoggedIn && <Nav.Link href="/register">Sign Up</Nav.Link>}
            {!appData?.isLoggedIn && <Nav.Link href="/login">Sign In</Nav.Link>}
            {appData?.isLoggedIn && 
            <>
              <Nav.Link href="/new">Add Book</Nav.Link>
              <DropdownButton variant='info' id="dropdown-variants-Info" title={appData.state.user.first_name}>
                <Dropdown.Item href="/user">Profile</Dropdown.Item>
                <Dropdown.Item href="/request">Requests 
                {receivedRequests && <span className="open-requests">{receivedRequests}</span>} 
                </Dropdown.Item>
                <Dropdown.Item href="/" onClick={appData.logout}>Logout</Dropdown.Item>
              </DropdownButton>
            </>
            }
          </Nav>
        </Container>

    </Navbar>
    </>
  );
}

export default Navigation;