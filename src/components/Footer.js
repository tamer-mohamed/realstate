import React from 'react';
import Select from 'react-select';
import {Link} from 'react-router';
import {FormattedMessage, FormattedNumber, FormattedRelative} from 'react-intl';

const Footer = () => (
  <footer>
    <div className="container">
      <div className="row">
        <div className="col-md-5 copy-right">
          <p><img src="dist/images/footer-logo.png" alt="Logo" className="img-responsive"/>

            <FormattedMessage id="footer.copyrights"/>
          </p>
        </div>
        <div className="col-md-7">
          <ul>
            <li><a href="#"><FormattedMessage id="footer.menu.home"/></a></li>
            <li><a href="#"> <FormattedMessage id="footer.menu.properties"/></a></li>
            <li><a href="#"> <FormattedMessage id="footer.menu.services"/></a></li>
            <li><a href="#"> <FormattedMessage id="footer.menu.contact"/></a></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
