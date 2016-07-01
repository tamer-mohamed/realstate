import React from 'react';
import { Link } from 'react-router';

const UserGadgetLogged = React.createClass({
  contextTypes: {
    lang: React.PropTypes.string
  },

  render: function(){
    return (
      <div>
        <Link to={`${this.context.lang}/user/login`}>Login</Link> / <Link to={`${this.context.lang}/user/register`}>Register</Link>
      </div>
    )
  }
});

export default UserGadgetLogged;
