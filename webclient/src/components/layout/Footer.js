import React from 'react';
import '../../css/footer.css';
import Logo from '../../assets/images/logo.png';

const Footer = props => {
  return (
    <>
      <footer className="footer">
        <div className="footer__logo">
          <img
            src={Logo}
            alt="Logo"
            style={{ height: 100, marginTop: 10, marginBottom: -10 }}
          />
          <h3>VISIT</h3>
          <h5>Perhimpunan Indonesia NUS</h5>
        </div>
        <div className="footer__links">
          <ul className="footer__col">
            <li style={{ borderColor: '#ff0000' }}>
              <h5>USEFUL LINKS</h5>
            </li>
            <li>
              <a href="https://pi-nus.org" style={{ color: 'inherit' }}>
                PINUS Homepage
              </a>
            </li>
            <li>
              <a href="https://visit.pi-nus.org">Visit Homepage</a>
            </li>
            <li>
              <a href="https://visit.pi-nus.org/itinerary">Itinerary</a>
            </li>
          </ul>
          <ul className="footer__col">
            <li style={{ borderColor: '#efb61e' }}>
              <h5>CONTACT US</h5>
            </li>
            <li className="footer__col__address">
              National University of Singapore <br />
              Yusof Ishak House, Level 3 <br />
              31 Lower Kent Ridge Road <br />
              Singapore 119078
            </li>
            <li>
              <div>
                <i className="fas fa-phone"> </i> &nbsp; +65 9160 1877
              </div>
            </li>
            <li>
              <div>
                <i className="fas fa-envelope"></i> &nbsp; visit@pi-nus.org
              </div>
            </li>
          </ul>
          <ul className="footer__col">
            <li style={{ borderColor: '#1f2e6e' }}>
              <h5>FOLLOW US</h5>
            </li>
            <li style={{ border: 'none' }}>
              <div className="col s10 offset-s1 l4">
                <a
                  href="https://www.facebook.com/PerhimpunanIndonesiaNUS/"
                  className="btn-floating btn black"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  href="https://www.instagram.com/pinusonline/"
                  className="btn-floating btn black"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  href="https://www.youtube.com/channel/UCfYU_ttUpJWNEKIbiWoQQHQ/"
                  className="btn-floating btn black"
                >
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </li>
          </ul>
        </div>
        <div className="ending">
          Copyright @2020 PINUS. All rights reserved.
        </div>
      </footer>
    </>
  );
};

export default Footer;
