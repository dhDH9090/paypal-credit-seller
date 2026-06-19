import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>عن التطبيق</h3>
          <p>تطبيق موثوق وآمن لشراء وبيع رصيد PayPal بأسهل طريقة</p>
        </div>
        <div className="footer-section">
          <h3>روابط سريعة</h3>
          <ul>
            <li><a href="/about">حول</a></li>
            <li><a href="/contact">اتصل بنا</a></li>
            <li><a href="/privacy">السياسة</a></li>
            <li><a href="/terms">الشروط</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>تواصل معنا</h3>
          <p>📧 support@example.com</p>
          <p>📱 +966501234567</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 بيع رصيد PayPal - جميع الحقوق محفوظة</p>
      </div>
    </footer>
  );
}

export default Footer;
