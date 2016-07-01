import React from 'react';

const UserGadgetLogged = React.createClass({


  render: function(){
    return (
      <div >
        <a href="#" className="dropdown-toggle" data-toggle="dropdown">
          <img src="dist/images/avatar1.png" alt="User Photo"/>
          <span className="drop-arow"/>
        </a>
        <ul className="dropdown-menu user-drop">
          <li><a href="#"><i className="fa fa-user"/>My Profile</a></li>
          <li><a href="#"><i className="fa fa-list"/>My Properties</a></li>
          <li><a href="#"><i className="fa fa-sign-out"/>Logout</a></li>
        </ul>
      </div>
    )
  }
});

export default UserGadgetLogged;
