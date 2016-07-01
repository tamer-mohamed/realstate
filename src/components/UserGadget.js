import React from 'react';
import { Link } from 'react-router';

// components
import UserGadgetLogged from './UserGadget.logged';
import UserGadgeNotLogged from './UserGadget.notLogged';


const UserGadget = React.createClass({

  isLoggedIn: function(){
    return this.props.userId !== null
  },

  render: function(){
    console.log(this.props.userId);
    return (
      <div className="user">
        {this.isLoggedIn() ? <UserGadgetLogged/> : <UserGadgeNotLogged/>}
      </div>
    );
  }

});

export default UserGadget;
