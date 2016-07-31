import React from "React";
import {Page} from '../containers/Page';
import Firebase from 'firebase';
import NProgress from 'nprogress';

import ProfileForm from './ProfileForm';

const UserEditProfile = React.createClass({

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
    console.log(this.context.user);
    Firebase.database().ref(`users/${this.context.user.uid}`).once('value', (snapshot)=>{
      console.log(snapshot);
      this.setState({loaded: true, user: snapshot.val()});
      NProgress.done();
    })
  },
  render: function(){
    if(!this.state.loaded)
      return null;


    return (
      <div className="row">
        <ProfileForm user={this.state.user} userId={this.context.user.uid}/>
      </div>

    )
  }
});


export default Page(UserEditProfile, "pageTitle.userProfile");
