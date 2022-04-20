import React, { useContext } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../img/logo3.png';
import UserContext from '../UserContext';
import '../css/AppNavBar.css';

function AppNavBar() {
  const { user } = useContext(UserContext);

  return (
    <Navbar className="navbar_Font" expand="lg">
      <Navbar.Brand as={Link} to="/" className="ms-5">
        <img
          className="mx-4 my-2"
          src={logo}
          alt="Lakbay Logo"
          height="60px"
          width="60px"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto me-5">
          <Nav.Link className="navlink-font mx-2" as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link className="navlink-font mx-2" as={Link} to="/rooms">
            Rooms
          </Nav.Link>

          {/* Conditionally render login or logout depending on user global variable */}
          {user.id !== null ? (
            <Nav.Link className="navlink-font mx-2" as={Link} to="/logout">
              Logout
            </Nav.Link>
          ) : (
            <>
              <Nav.Link className="navlink-font mx-2" as={Link} to="/register">
                Register
              </Nav.Link>
              <Nav.Link className="navlink-font mx-2" as={Link} to="/login">
                Log In
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default AppNavBar;
