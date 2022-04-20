import React, { useContext } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../img/logo2.png';
import UserContext from '../UserContext';
import '../css/AppNavbar.css';

function AppNavBar() {
  const { user } = useContext(UserContext);

  return (
    <Navbar className="text-light navbar_font" expand="lg">
      <Navbar.Brand as={Link} to="/" className="ms-5">
        <img
          className="mx-4 my-2"
          src={logo}
          alt="Lakbay Logo"
          height="50px"
          width="50px"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto me-5">

          <Nav.Link as={Link} to="/" className="navlink-font">
            Home
          </Nav.Link>

          <Nav.Link as={Link} to="/rooms" className="navlink-font">
            Rooms
          </Nav.Link>

          {
            user.id !== null && user.isAdmin === false ? (
              <Nav.Link as={Link} to="/bookings" className="navlink-font">
                Booking
              </Nav.Link>
            ) : null
          }

          {/* Conditionally render login or logout depending on user global variable */}
          {user.id !== null ? (
            <Nav.Link as={Link} to="/logout" className="navlink-font">
              Logout
            </Nav.Link>
          ) : (
            <>
              <Nav.Link as={Link} to="/register" className="navlink-font">
                Register
              </Nav.Link>
              <Nav.Link as={Link} to="/login" className="navlink-font">
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
