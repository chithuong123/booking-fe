import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { registerUserRequest } from '../actions/registerActions';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, successMessage } = useSelector((state) => state.register);

  // Điều hướng về home sau khi đăng ký thành công
  useEffect(() => {
    if (successMessage) {
      navigate('/');
    }
  }, [successMessage, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(registerUserRequest({ username, email, password }));
  };

  return (
    <Container className="my-4">
      <h1>Register Page</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </Button>
      </Form>
      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      {successMessage && <Alert variant="success" className="mt-3">{successMessage}</Alert>}
    </Container>
  );
}

export default Register;
