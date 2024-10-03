// App.js
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Header from './components/Header';
import Footer from './components/Footer';
import RoutesConfig from './routes/RoutesConfig';
import useAuth from './hooks/useAuth';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/Index.css';
import './assets/Transitions.css';

function App() {
  const { isLoggedIn, handleLogout } = useAuth();
  const location = useLocation();

  return (
    <div className="App">
      <HelmetConfig />
      <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <TransitionGroup>
        <CSSTransition key={location.key} classNames="fade" timeout={300}>
          <RoutesConfig location={location} />
        </CSSTransition>
      </TransitionGroup>
      <Footer />
    </div>
  );
}

const HelmetConfig = () => (
  <Helmet>
    <link rel="stylesheet" href="https://www.weddingbook.vn/_next/static/css/957e5a80d40fc4fc.css" />
    <style>
      {`body .only-pc { display: inline-block !important; }`}
    </style>
  </Helmet>
);

export default App;
