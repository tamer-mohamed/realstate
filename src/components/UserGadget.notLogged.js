import React from 'react';
import { Link } from 'react-router';
import {FormattedMessage,intlShape, injectIntl} from 'react-intl';

const UserGadgetLogged = React.createClass({
  contextTypes: {
    lang: React.PropTypes.string
  },

  render: function(){
    return (
      <div>
        <Link to={`${this.context.lang}/user/login`}><FormattedMessage id="login" /></Link> /  <Link to={`${this.context.lang}/user/register`}><FormattedMessage id="register" /></Link>
      </div>
    )
  }
});

export default UserGadgetLogged;
