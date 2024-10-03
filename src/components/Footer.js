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
              <a href="https://www.weddingbook.vn/chup-hinh-cuoi-tron-goi" target="_blank"><p>Chụp ảnh cưới trọn gói</p></a>
              <a href="https://www.weddingbook.vn/chup-anh-cuoi-da-lat" target="_blank"><p>Chụp ảnh cưới Đà Lạt</p></a>
              <a href="https://www.weddingbook.vn/trung-tam-tiec-cuoi" target="_blank"><p>Tư vấn nhà hàng tiệc cưới</p></a>
              <a href="https://www.weddingbook.vn/e-gift" target="_blank"><p>E-gift</p></a>
              <a href="https://www.weddingbook.vn/event" target="_blank"><p>Triển lãm cưới</p></a>
              <a href="https://www.weddingbook.vn/thiet-ke-vay-cuoi" target="_blank"><p>Váy cưới</p></a>
            </div>
            <dl className="address">
              <div><dd>Thứ hai - Chủ Nhật (9:00 - 21:00)</dd></div>
              <div><dd><a href="tel:+842873073066">+84 28 7307 3066</a></dd></div>
              <div><dd><a href="https://goo.gl/maps/mdAeCrFkmfvJgNXK6" target="_blank">583 Sư Vạn Hạnh, Phường 13, Quận 10, Tp.HCM</a></dd></div>
            </dl>
          </div>
        </div>
        <div className="footer-wrapper-down">
          <p>Công ty Cổ Phần Wedding Book Việt Nam<br />Mã số doanh nghiệp 0316292408</p>
          <div className="dmca">
            <a href="https://www.dmca.com/Protection/Status.aspx?ID=a3d382b4-6187-4eef-a22a-67d4d551c08b&amp;refurl=https://www.weddingbook.vn" title="DMCA.com Protection Status">
              <img src="https://images.dmca.com/Badges/dmca_protected_sml_120s.png?ID=a3d382b4-6187-4eef-a22a-67d4d551c08b" alt="DMCA Badge" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
