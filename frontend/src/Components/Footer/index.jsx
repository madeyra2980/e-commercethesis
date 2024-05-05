import React from 'react';
import './Footer.css';
import ItValley from '../Assets/itValley.jpg';

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
            <li>Email: oner_3d@gmail.com</li>
            <li>Тел-номер: +7 74</li>
            <li>Адресс: г. Семей Абая 107</li>
          </ul>
        </div>
      </div>
      <div className="footerBottom">
        <p className="footerCopyright">
          &copy; {new Date().getFullYear()} Company. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
