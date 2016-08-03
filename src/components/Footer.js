import React from 'react';
import Select from 'react-select';
import {Link} from 'react-router';
import {FormattedMessage, FormattedNumber, FormattedRelative} from 'react-intl';

const Footer = (props) => (
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
            <li>
              <Link to={`${props.lang}`}>
                <FormattedMessage id="footer.menu.home"/>
              </Link>
            </li>
            <li>
              <Link to={`${props.lang}`}>
                <FormattedMessage id="footer.menu.properties"/>
              </Link>
            </li>
            <li>
              <Link to={`${props.lang}/contact`}>
                <FormattedMessage id="footer.menu.contact"/>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
