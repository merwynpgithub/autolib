import React, {useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Container, Navbar, Nav, Dropdown, DropdownButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './styles/nav.scss';
import axios from 'axios';

function Navigation({appData}) {

  const [receivedRequests, setReceivedRequests] = useState("");
  useEffect(() => {
    axios.get("/api/requests/from_others_for_me")
    .then(res => {
      const openRequests = res.data.filter(req => req.completed_at === null);
      if (openRequests.length >= 1) setReceivedRequests(openRequests.length);
    })
    .catch(err => console.log(err));
  },[])

  return (
    <>
    <Navbar className='navbar' expand="lg">
        <Container fluid>
          <div className='sec_1'>
            <img src="/logo.png" alt="autolib logo" className='logo'/>
            <Nav className="nav_links">
              <Link className="nav-link" to={`/`} key={1}>Home</Link>
              <Link className="nav-link" to={`/about`} key={2}>About</Link>
              <Link className="nav-link" to={`/books`} key={3}>Catalogue</Link>              
            </Nav>
          </div>

          <Nav>
            {!appData?.isLoggedIn && <Link className="nav-link" to={`/register`} key={4}>Register</Link>}
            {!appData?.isLoggedIn && <Link className="nav-link" to={`/login`} key={5}>Sign In</Link>}
            {appData?.isLoggedIn && 
            <>
              <Link className="nav-link" to={`/new`} key={6}>Add Book</Link>              
              <DropdownButton variant='info' id="dropdown-variants-Info" title={appData.user.first_name}>
                <Link className="dropdown-item" to={`/user`} key={7}>Profile</Link>
                <Link className="dropdown-item" to={`/request`} key={8}>
                  Requests
                  {receivedRequests && <span className="open-requests">{receivedRequests}</span>} 
                </Link>
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