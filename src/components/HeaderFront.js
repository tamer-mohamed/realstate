import React from 'react';
import { Link } from 'react-router';
import Select from 'react-select';
import Button from 'react-bootstrap/lib/Button';
import ReactFireMixin from 'reactfire';
import Firebase from 'firebase';
import UserGadget from './UserGadget';
import {FormattedMessage, FormattedNumber, FormattedRelative} from 'react-intl';

const HeaderFront = React.createClass({
  contextTypes: {
    lang: React.PropTypes.string,
    user: React.PropTypes.any
  },
  render: function(){
    let lang = this.context.lang;

    return (
      <section>

        <header className="clearfix">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="logo">
                  <Link activeClassName="active" to={`/${lang}`}>
                    <img src="dist/images/logo.png" alt="HATA"/>
                  </Link>
                </div>

                <nav className="navbar collapse" id="mobile-menu">
                  <ul className="nav navbar-nav">
                    <li><Link activeClassName="active" to={`/${lang}`}><FormattedMessage id="menu.home"/></Link></li>
                    <li><Link activeClassName="active" to={`/${lang}/about/`}><FormattedMessage id="menu.about"/></Link>
                    </li>
                    <li><Link activeClassName="active" to={`/${lang}/contact/`}><FormattedMessage
                      id="menu.contact"/></Link></li>
                  </ul>
                </nav>

                <UserGadget userId={this.context.user}/>


                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#mobile-menu"
                        aria-expanded="false">
                  <span className="icon-bar"/>
                  <span className="icon-bar"/>
                  <span className="icon-bar"/>
                </button>
              </div>
            </div>
          </div>
        </header>

      </section>
    )
  }
});

export default HeaderFront;
