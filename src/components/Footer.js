// Footer.js
import React from 'react';

function Footer() {
  return (
    <footer>
      <div className="footer-wrapper">
        <div className="footer-wrapper-up">
          <div className="left">
            <img src="https://www.weddingbook.vn/images/footer_logo.png" alt="footer logo" />
            <em>Experience K-Wedding Service At Once</em>
            <span>Studio / Dress / Make up / Planner</span>
          </div>
          <div className="right">
            <div className="services">
              <a><p>Chụp ảnh cưới trọn gói</p></a>
              <a><p>Chụp ảnh cưới Đà Lạt</p></a>
              <a><p>Tư vấn nhà hàng tiệc cưới</p></a>
              <a><p>E-gift</p></a>
              <a><p>Triển lãm cưới</p></a>
              <a><p>Váy cưới</p></a>
            </div>
            <dl className="address">
              <div><dd>Thứ hai - Chủ Nhật (9:00 - 21:00)</dd></div>
              <div><dd><a href="tel:+842873073066">+84 888 888 8xx</a></dd></div>
              <div><dd><a href="https://goo.gl/maps/mdAeCrFkmfvJgNXK6" target="_blank">Khu đô thị mới An Phú Thịnh, Phường Nhơn Bình & Phường Đống Đa, TP. Quy Nhơn, Bình Định</a></dd></div>
            </dl>
          </div>
        </div>
        <div className="footer-wrapper-down">
          <p>Wedding Book Việt Nam<br /></p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
