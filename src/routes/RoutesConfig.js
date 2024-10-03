// RoutesConfig.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Agencies from '../pages/Agencies';
import Booking from '../pages/Booking';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ServiceDetail from '../pages/ServiceDetail';
import Profile from '../pages/Profile';

const RoutesConfig = ({ location }) => (
  <Routes location={location}>
    <Route path="/" element={<Home />} />
    <Route path="/agencies" element={<Agencies />} />
    <Route path="/booking" element={<Booking />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/services/:serviceId" element={<ServiceDetail />} />
    <Route path="/profile" element={<Profile />} />
  </Routes>
);

export default RoutesConfig;
