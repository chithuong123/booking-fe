import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useNavbarHeight = () => {
  const [navbarHeight, setNavbarHeight] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const navbar = document.querySelector('.header');

    if (!navbar) return; // Nếu không có navbar, thoát sớm

    const updateNavbarHeight = () => {
      setNavbarHeight(navbar.offsetHeight);
    };

    // Sử dụng ResizeObserver để theo dõi thay đổi kích thước của navbar
    const resizeObserver = new ResizeObserver(() => updateNavbarHeight());
    resizeObserver.observe(navbar);

    // Cập nhật chiều cao navbar ngay lập tức
    updateNavbarHeight();

    // Cleanup observer khi component unmount
    return () => resizeObserver.disconnect();
  }, [location]);

  return navbarHeight;
};

export default useNavbarHeight;
