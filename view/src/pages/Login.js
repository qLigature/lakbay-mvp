import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';


export default function Login(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isActive, setIsActive] = useState(false);

  function authenticate(e) {
    e.preventDefault();

    localStorage.setItem("email", email);

    setEmail('');
    setPassword('');

    alert(`${email} has been verified, welcome back!`);
  }

  useEffect(() => {
    if (email !== '' && password !== '') {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email, password]);

  return (
    <Form onSubmit={e => authenticate(e)}>
      <h1>Log In</h1>
      <Form.Group controlId="email">
        <Form.Label>Email Address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Insert your registered email here"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Insert your registered password here"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      {isActive ?
        <Button variant="primary" type="submit" id="submitBtn" className="mt-3 mb-3">
          Log In
        </Button>
        :
        <Button variant="danger" type="submit" id="submitBtn" className="mt-3 mb-3" disabled>
          Log In
        </Button>
      }
    </Form>

  );
}