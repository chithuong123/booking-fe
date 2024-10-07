import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { loginRequest } from '../actions/authActions';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, success, loading } = useSelector(state => state.auth);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginRequest({ email, password }));
  };

  // Điều hướng về trang chủ nếu đăng nhập thành công
  useEffect(() => {
    if (success) {
      navigate('/');  // Điều hướng về home
    }
  }, [success, navigate]);

  return (
    <Container className="my-4">
      <h1>Login Page</h1>
      <Form onSubmit={handleSubmit}>
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
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </Form>
      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
    </Container>
  );
}

export default Login;
