import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footerContainer">
        <div className="footerLeft">
          <h2 className="footerLogo">
            ПАРТНЕРЫ
          </h2>
        </div>
        <div className="footerRight">
          <h3 className="footerTitle">Контакты</h3>
          <ul className="footerContact">
            <li>Email: </li>
            <li>Тел-номер: +7 777 77 77</li>
            <li>Адресс:  г. Алматы 107</li>
          </ul>
        </div>
      </div>
      <div className="footerBottom">
        <p className="footerCopyright">
          &copy; {new Date().getFullYear()} 
        </p>
      </div>
    </footer>
  );
};

export default Footer;
