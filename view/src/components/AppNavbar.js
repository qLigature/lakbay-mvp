import React, { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function AppNavBar() {

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/" className="h1 ms-5 my-3">Lakbay</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto me-5">

          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/products">Products</Nav.Link>

          <Nav.Link as={Link} to="/register">Register</Nav.Link>
          <Nav.Link as={Link} to="/login">Log In</Nav.Link>

        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default AppNavBar;