import React from "React";
import Firebase from 'firebase';
import {Page} from '../containers/Page';
import NProgress from 'nprogress';
import ProfilePic from '../ProfilePic';
import FontAwesome from 'react-fontawesome';
import {FormattedMessage} from 'react-intl';
import {Link} from 'react-router';

const UserProfile = React.createClass({

  contextTypes: {
    user: React.PropTypes.any,
    lang: React.PropTypes.string,
    pushNotification: React.PropTypes.func
  },
  getInitialState: function(){
    return {
      loaded: false,
      user: {}
    }
  },
  componentWillMount: function(){
    NProgress.start();
    Firebase.database().ref(`users/${this.context.user.uid}`).once('value', (snapshot)=>{
      this.setState({loaded: true, user: snapshot.val()});
      NProgress.done();
    })
  },
  render: function(){
    if(!this.state.loaded)
      return null;

    let {user} = this.state;
    return (
      <div className="row">
        <div className="col-md-4 col-sm-6">
          <figure>
            <ProfilePic image={this.state.user.image} userId={this.context.user.uid}/>
          </figure>
          <Link to={`${this.context.lang}/user/profile/edit`}><i className="fa fa-edit"/> <FormattedMessage
            id="userProfile.edit"/></Link>
        </div>
        <div className="col-md-8 col-sm-7">
          <h2>{this.state.user.fname}</h2>
          { user.companyName ?
            <p><i className="fa fa-building-o"/> <span>{user.companyName}</span></p>
            : null }
          <p>{user.intro}</p>
          <h3><FormattedMessage id="userProfile.contact"/></h3>

          <ul className="agent-contact">
            {user.contactnumber ?
              <li><a href="#"><i className="fa fa-phone"/> {user.contactnumber}</a></li> : null }
            <li><a href="#"><i className="fa fa-envelope"/> {this.context.user.email}</a></li>
          </ul>
        </div>


      </div>
    )
  }
});

export default Page(UserProfile, {className: "team-single"});
