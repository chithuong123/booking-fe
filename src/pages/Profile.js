import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Form, Button, Spinner, Alert, Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Profile() {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
  });
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setProfile(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching profile.');
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prevPasswords) => ({
      ...prevPasswords,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5000/api/profile', profile, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setIsEditing(false);
    } catch (error) {
      setError('Error updating profile.');
    }
  };

  const handlePasswordUpdate = async () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      setPasswordError('New password and confirmation password do not match.');
      setPasswordSuccess('');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5000/api/profile/password', passwords, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setPasswordSuccess('Password updated successfully.');
      setPasswordError('');
      setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      setPasswordError('Error updating password.');
      setPasswordSuccess('');
    }
  };

  if (loading) {
    return (
      <Container className="my-4 text-center">
        <Spinner animation="border" variant="primary" />
        <p>Loading profile...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <Card className="shadow-lg p-3 mb-5 bg-white rounded">
        <Card.Body>
          <Card.Title className="text-primary">Profile</Card.Title>
          <Tabs defaultActiveKey="profile" id="profile-tabs" className="mb-3">
            <Tab eventKey="profile" title="Edit Profile">
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={profile.username}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </Form.Group>
                {isEditing ? (
                  <Button variant="primary" onClick={handleSave}>Save</Button>
                ) : (
                  <Button variant="secondary" onClick={() => setIsEditing(true)}>Edit</Button>
                )}
              </Form>
            </Tab>
            <Tab eventKey="password" title="Update Password">
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Old Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="oldPassword"
                    value={passwords.oldPassword}
                    onChange={handlePasswordChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="newPassword"
                    value={passwords.newPassword}
                    onChange={handlePasswordChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={passwords.confirmPassword}
                    onChange={handlePasswordChange}
                  />
                </Form.Group>
                <Button variant="primary" onClick={handlePasswordUpdate}>Update Password</Button>
              </Form>
              {passwordError && <Alert variant="danger" className="mt-3">{passwordError}</Alert>}
              {passwordSuccess && <Alert variant="success" className="mt-3">{passwordSuccess}</Alert>}
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Profile;