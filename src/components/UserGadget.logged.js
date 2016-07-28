import React from 'react';
import ReactFireMixin from 'reactfire';
import Firebase from 'firebase';
import {FormattedMessage} from 'react-intl';
import { hashHistory,withRouter } from 'react-router';
import { Link } from 'react-router';

const UserGadgetLogged = React.createClass({
  mixins: [ReactFireMixin],
  propTypes: {
    userId: React.PropTypes.string
  },
  contextTypes: {
    lang: React.PropTypes.string,
    user: React.PropTypes.any,
    switchLang: React.PropTypes.func
  },
  getInitialState: function(){
    return {
      currentUser: {
        fname: ""
      }
    }
  },
  componentWillMount: function(){
    this.bindAsObject(firebase.database().ref(`users/${this.props.userId}`), 'currentUser');
  },
  handleLogout: function(e){
    e.preventDefault();

    Firebase.auth().signOut().then(()=>{
      // redirect to homepage
      hashHistory.push(this.context.lang);
    });
  },
  switchLang(lang){
    this.props.router.push(this.context.lang);
  },
  render: function(){
    let lang = this.context.lang;
    return (
      <div>
        <a href="#" className="dropdown-toggle" data-toggle="dropdown">
          <img src="dist/images/avatar1.png" alt="User Photo"/>
          <span className="userName">{this.state.currentUser.fname}</span>
          <span className="drop-arow"/>
        </a>

        <ul className="dropdown-menu user-drop">
          <li>
            <Link to={`${lang}/user/profile`}><i className="fa fa-user"/>My Profile</Link>
          </li>
          <li>
            <Link to={`${lang}/user/dashboard/properties`}><i className="fa fa-list"/>My Properties</Link>
          </li>
          <li>
            <a onClick={this.handleLogout}><i className="fa fa-sign-out"/>Logout</a>
          </li>
        </ul>

      </div>
    )
  }
});

export default withRouter(UserGadgetLogged);
