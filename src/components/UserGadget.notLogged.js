import React from 'react';
import { Link } from 'react-router';

const UserGadgetLogged = React.createClass({


  render: function(){
    return (
      <div>
        <Link to={'/login'}>Login</Link> / <Link to={'/login'}>Register</Link>
      </div>
    )
  }
});

export default UserGadgetLogged;
