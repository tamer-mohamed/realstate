import React from "React";
import Firebase from 'firebase';
import NProgress from 'nprogress';
import FontAwesome from 'react-fontawesome';
import {FormattedMessage} from 'react-intl';
import {Link} from 'react-router';

import {Page} from '../containers/Page';
import ProfilePic from '../ProfilePic';
import UserPropertiesGrid from '../UserPropertiesGrid';

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
    let userId = this.props.params.userId || this.context.user.uid;
    NProgress.start();
    Firebase.database().ref(`users/${userId}`).once('value', (snapshot)=>{
      let isOwner = !this.props.params.userId || this.props.params.userId === this.context.user.uid;
      this.setState({loaded: true, isOwner, user: snapshot.val()});
      NProgress.done();
    })
  },
  render: function(){
    if(!this.state.loaded)
      return null;

    let {user} = this.state;
    let userId = this.props.params && this.props.params.userId ? this.props.params.userId : this.context.user.uid;
    return (
      <div>
        <div className="page-wrap team-single">
          <div className="container">

            <div className="row">
              <div className="col-md-12">
                <h2 className="page-title">{user.fname}</h2>
                { user.companyName ?
                  <p><i className="fa fa-building-o"/> <span>{user.companyName}</span></p>
                  : null }
                {this.state.isOwner &&
                <Link className="btn btn-small btn-alt btn-danger" to={`${this.context.lang}/user/profile/edit`}><i
                  className="fa fa-edit"/>
                  <FormattedMessage
                    id="userProfile.edit"/></Link>
                }

              </div>
            </div>

            <div className="row user-data">

              <div className="col-md-4 col-sm-6">
                <figure>
                  <ProfilePic image={this.state.user.image} userId={userId}/>
                </figure>
              </div>

              <div className="col-md-7 col-sm-7">
                <p>{user.intro}</p>
                <h3><FormattedMessage id="userProfile.contact"/></h3>
                <ul className="agent-contact">
                  {user.contactnumber ?
                    <li><a href="#"><i className="fa fa-phone"/> {user.contactnumber}</a></li> : null }
                  <li><a href="#"><i className="fa fa-envelope"/> {user.email}</a></li>
                </ul>
              </div>

            </div>


            <div className="row">
              <div className="col-md-12">
                <UserPropertiesGrid userId={userId}/>
              </div>
            </div>

          </div>
        </div>


      </div>
    )
  }
});

export default UserProfile;
