import React from 'react';
import { Link } from 'react-router';

// components
import UserGadgetLogged from './UserGadget.logged';
import UserGadgeNotLogged from './UserGadget.notLogged';


const UserGadget = React.createClass({
  contextTypes: {
    lang: React.PropTypes.string,
    user: React.PropTypes.any
  },

  renderGadget: function(){
    let gadget;
    if(this.context.user !== null){
      gadget = <UserGadgetLogged userId={this.context.user.uid}/>;
    }
    else
      gadget = <UserGadgeNotLogged />;

    return gadget;
  },
  render: function(){

    return (
      <div className="user">
        {this.renderGadget()}
      </div>
    );
  }

});

export default UserGadget;
