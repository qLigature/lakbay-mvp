import React, { useState, useEffect, useContext } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../css/Login.css';
import UserContext from '../UserContext';

function Login(props) {
  const { user, setUser } = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isActive, setIsActive] = useState(false);

  const navigate = useNavigate();

  function authenticate(e) {
    e.preventDefault();

    // Check if user's email and password is in the database using fetch
    fetch('http://localhost:9000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Invalid email or password');
        }
      })
      .then((data) => {
        if (data.error) {
          console.log(data.error);
          return;
        }
        console.log(data);
        // Save user's id and isAdmin to global user state
        retrieveUserDetails(data.token);
        // Save JWT to sessionStorage
        sessionStorage.setItem('token', data.token);

        setEmail('');
        setPassword('');

        Swal.fire({
          title: 'Login Successful',
          icon: 'success',
          text: 'Welcome back to Lakbay!'
        });

        // Redirect to home page
        navigate('/');
      })
      .catch((error) => {
        Swal.fire({
          title: 'Authentication Failed',
          icon: 'error',
          text: 'Please check your credentials'
        });
      });
  }

  const retrieveUserDetails = (token) => {
    fetch('http://localhost:9000/users/verify', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setUser({
          id: data.id,
          isAdmin: data.isAdmin
        });
      });
  };

  // Disable button if either email or password fields are empty
  useEffect(() => {
    if (email !== '' && password !== '') {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email, password]);

  return (
    <div className="loginCard col-12 mx-auto">
      <Form onSubmit={(e) => authenticate(e)}>
        <h2 className="mt-2 py-2">Log In</h2>
        <Form.Group controlId="email">
          <Form.Control
            className="my-4 py-2"
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Control
            className="mt-4 mb-2 py-2"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <div className="d-flex justify-content-center">
          {isActive ? (
            <Button
              className="mb-2 px-5 my-3 rounded-pill btn-lg"
              variant="danger"
              type="submit"
              id="submitBtn"
            >
              Log In
            </Button>
          ) : (
            <Button
              className="mt-3 mb-2 px-5 rounded-pill btn-lg"
              variant="secondary"
              type="submit"
              id="submitBtn"
              disabled
            >
              Log In
            </Button>
          )}
        </div>
        <hr className="solid"></hr>
        <div className="d-flex justify-content-center mt-4">
          <Button
            variant="primary"
            type="submit"
            id="submitBtn"
            as={Link}
            to="/register"
          >
            Create a New Account
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Login;
