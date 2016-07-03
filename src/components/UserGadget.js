import React from 'react';
import { Link } from 'react-router';

// components
import UserGadgetLogged from './UserGadget.logged';
import UserGadgeNotLogged from './UserGadget.notLogged';


const UserGadget = React.createClass({
  propTypes:{
    user: React.PropTypes.any
  },
  contextTypes: {
    lang: React.PropTypes.string,
    user: React.PropTypes.any
  },

  render: function(){
    let gadget = this.context.user !== null ? <UserGadgetLogged userId={this.context.user.uid}/> :
      <UserGadgeNotLogged />;

    return (
      <div className="user">
        {gadget}
      </div>
    );
  }

});

export default UserGadget;
