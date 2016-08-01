import React from "React";
import Firebase from 'firebase';
import {Page} from '../containers/Page';
import NProgress from 'nprogress';
import ProfilePic from '../ProfilePic';

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
        <div className="col-md-8">
          <h1>{this.state.user.fname}</h1>
        </div>
        <div className="col-md-4">

        </div>
      </div>
    )
  }
});

export default Page(UserProfile);
