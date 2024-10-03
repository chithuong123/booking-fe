import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useNavbarHeight = () => {
  const [navbarHeight, setNavbarHeight] = useState(0);
  const location = useLocation(); // Use useLocation hook

  useEffect(() => {
    const updateNavbarHeight = () => {
      const navbar = document.querySelector('.header');
      if (navbar) {
        setNavbarHeight(navbar.offsetHeight);
      }
    };

    // Update navbar height immediately
    updateNavbarHeight();

    // Add event listener to update navbar height on window resize
    window.addEventListener('resize', updateNavbarHeight);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateNavbarHeight);
    };
  }, [location]); // Re-run effect when location changes

  return navbarHeight;
};

export default useNavbarHeight;