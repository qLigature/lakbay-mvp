import React, { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
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
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Invalid email or password');
        }
      })
      .then(data => {
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
      .catch(error => {
        Swal.fire({
          title: 'Authentication Failed',
          icon: 'error',
          text: 'Please check your credentials'
        });
      });
  }

  const retrieveUserDetails = (token) => {
    fetch('http://localhost:9000/users/verify', {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {

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
    <Form onSubmit={(e) => authenticate(e)}>
      <h1>Log In</h1>
      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      {isActive ? (
        <Button
          variant="primary"
          type="submit"
          id="submitBtn"
          className="mt-3 mb-3"
        >
          Log In
        </Button>
      ) : (
        <Button
          variant="danger"
          type="submit"
          id="submitBtn"
          className="mt-3 mb-3"
          disabled
        >
          Log In
        </Button>
      )}
    </Form>
  );
}

export default Login;