import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/authActions'; // Import action logout

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Lấy trạng thái đăng nhập từ Redux store
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleLogout = () => {
    dispatch(logout());  // Gọi action logout
    navigate('/');       // Điều hướng về trang chủ sau khi logout
  };

  return (
    <header className="header" style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000 }}>
      <div className="logo-box">
        <img alt="logo-weddingbook" src="https://www.weddingbook.vn/images/weddingbook-black.png" />
      </div>
      <nav className="gnb-wrap only-pc layout-home">
        <ul className="gnb-wrap-ul">
          <li className="gnb-wrap-li">
            <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink>
          </li>
          <li className="gnb-wrap-li">
            <NavLink to="/agencies" className={({ isActive }) => (isActive ? 'active' : '')}>Agencies</NavLink>
          </li>
          <li className="gnb-wrap-li">
            <NavLink to="/booking" className={({ isActive }) => (isActive ? 'active' : '')}>Booking</NavLink>
          </li>
          {isLoggedIn ? (
            <>
              <li className="gnb-wrap-li">
                <NavLink to="/profile" className={({ isActive }) => (isActive ? 'active' : '')}>Profile</NavLink>
              </li>
              <li className="gnb-wrap-li" onClick={handleLogout}>
                <span style={{ cursor: 'pointer' }}>Logout</span>
              </li>
            </>
          ) : (
            <>
              <li className="gnb-wrap-li">
                <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>Login</NavLink>
              </li>
              <li className="gnb-wrap-li">
                <NavLink to="/register" className={({ isActive }) => (isActive ? 'active' : '')}>Register</NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
