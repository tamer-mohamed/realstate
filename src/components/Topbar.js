import React from 'react';
import { Link } from 'react-router';
import {FormattedMessage,intlShape, injectIntl} from 'react-intl';
import LangSwitcher from './LangSwitcher';

const Topbar = React.createClass({
  contextTypes: {
    lang: React.PropTypes.string,
    user: React.PropTypes.any
  },
  render: function(){
    let langs = {ar: {text: 'Arabic', code: 'ar'}, en: {text: 'English', code: 'en'}};
    return (
      <div className="top-bar">
        <div className="container">
          <div className="row">
            <div className="col-md-12">

              <p className="text">
                <a><i className="fa fa-map-marker"/> <FormattedMessage id="settings.country"/></a>
                <a href="tel:+61383766284"><i className="fa fa-phone"/> <FormattedMessage
                  id="settings.phoneNumber"/></a>
              </p>

              <p className="text pull-right">
                <LangSwitcher langs={langs} currentLang={this.context.lang}/>
              </p>

            </div>
          </div>
        </div>

      </div>
    )
  }
});

export default Topbar;
