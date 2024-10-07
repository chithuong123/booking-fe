import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Card, Form, Button, Spinner, Alert, Tabs, Tab } from 'react-bootstrap';

// Action types
const FETCH_PROFILE_REQUEST = 'FETCH_PROFILE_REQUEST';
const UPDATE_PROFILE_REQUEST = 'UPDATE_PROFILE_REQUEST';
const UPDATE_PASSWORD_REQUEST = 'UPDATE_PASSWORD_REQUEST';

function Profile() {
  const dispatch = useDispatch();
  const { profile, loading, error, passwordSuccess, passwordError } = useSelector(state => state.profile);

  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch({ type: FETCH_PROFILE_REQUEST });
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: UPDATE_PROFILE_REQUEST, payload: { ...profile, [name]: value } });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prevPasswords) => ({
      ...prevPasswords,
      [name]: value,
    }));
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    dispatch({ type: UPDATE_PROFILE_REQUEST, payload: profile });
  };

  const handlePasswordUpdate = () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    dispatch({ type: UPDATE_PASSWORD_REQUEST, payload: passwords });
    setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' });
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
                  <Button variant="primary" onClick={handleSaveProfile}>Save</Button>
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
