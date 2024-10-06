import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';  // Import Provider từ react-redux
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import useNavbarHeight from './hooks/useNavbarHeight'; // Import hook
import store from './store'; // Import store đã cấu hình

const RootComponent = () => {
  const navbarHeight = useNavbarHeight(); // Sử dụng hook để lấy chiều cao của navbar

  return (
    <div style={{ paddingTop: `${navbarHeight}px` }}>
      <App />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // Loại bỏ React.StrictMode để ngăn chặn việc gọi useEffect hai lần trong quá trình phát triển
  <Provider store={store}>
    <Router>
      <RootComponent />
    </Router>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
