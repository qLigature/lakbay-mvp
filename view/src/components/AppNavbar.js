import React, { useContext } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../img/logo.png';
import UserContext from '../UserContext';

function AppNavBar() {

  const { user } = useContext(UserContext);

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/" className="ms-5">
        <img className="mx-4 my-2" src={logo} alt="Lakbay Logo" height="70px" width="70px" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto me-5">

          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/rooms">Rooms</Nav.Link>

          {/* Conditionally render login or logout depending on user global variable */}
          {(user.id !== null) ?

            <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
            :
            <>
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
              <Nav.Link as={Link} to="/login">Log In</Nav.Link>
            </>
          }

        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default AppNavBar;