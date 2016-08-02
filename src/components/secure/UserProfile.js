import React from "React";
import Firebase from 'firebase';
import {Page} from '../containers/Page';
import NProgress from 'nprogress';
import ProfilePic from '../ProfilePic';
import FontAwesome from 'react-fontawesome';

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


    return (
      <div className="row">
        <div className="col-md-10">
          <h4>{this.state.user.fname}</h4>
        </div>
        <div className="col-md-2">
          <ProfilePic image={this.state.user.image} userId={this.context.user.uid}/>
        </div>
      </div>
    )
  }
});

export default Page(UserProfile);
