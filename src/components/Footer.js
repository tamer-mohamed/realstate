import React from 'react';
import Select from 'react-select';
// Be sure to include styles at some point, probably during your bootstrapping
//import 'react-select/dist/react-select.css';

const Footer = () => (
  <footer>
    <div className="container">
      <div className="row">
        <div className="col-md-5 copy-right">
          <p><img src="dist/images/footer-logo.png" alt="Logo" className="img-responsive"/>
            Al-Ahmad Real Estate
          </p>
        </div>
        <div className="col-md-7">
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Properties</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Team</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
