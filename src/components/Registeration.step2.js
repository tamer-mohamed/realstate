import {Page} from './containers/Page';
import React from 'react';
import { Link } from 'react-router';
import {injectIntl} from 'react-intl';
import { hashHistory } from 'react-router';
import Password from './user/updatePassword';
import constants from '../constants';
import Firebase from 'firebase';
import qwest from 'qwest';
import progress from 'nprogress';
import { Form } from 'formsy-react';

const Verification = React.createClass({

  contextTypes: {
    lang: React.PropTypes.string,
    pushNotification: React.PropTypes.func
  },
  getInitialState: function(){
    return {loaded: false}
  },
  componentWillMount: function(){
    let {formatMessage} = this.props.intl;
    progress.start();
    firebase.database().ref('verifications/' + this.props.params.activationKey).once('value').then((snapshot)=>{
      let data = snapshot.val();
      progress.done();

      if(data === null){
        this.context.pushNotification({
          message: formatMessage({id: 'forms.user.verification.wrongId'}),
          level: 'error'
        });
      }
      else{
        this.setState({loaded: true, data});
      }


    })
  },
  submit: function(values){
    let {params} = this.props;
    let {formatMessage} = this.props.intl;

    progress.start();
    Firebase.auth().createUserWithEmailAndPassword(this.state.data.email, values.password).then((user)=>{
      qwest.post(`${constants.BE}user/verify/${params.activationKey}`, {
        userId: user.uid
      }).then(()=>{
        progress.done();
        // redirect to homepage
        hashHistory.push(this.context.lang);
      }).catch((e)=>{

        progress.done();
        this.context.pushNotification({
          message: formatMessage({id: 'forms.user.verification.error'}),
          level: 'error'
        });

        // TOOD: delete created user
      });
    }).catch((e)=>{

      progress.done();
      this.context.pushNotification({
        message: formatMessage({id: 'forms.user.verification.error.register'}),
        level: 'error'
      });
    })

  },
  render: function(){
    let {formatMessage} = this.props.intl;
    return (
      this.state.loaded ?
        <Form ref="form" onSubmit={this.submit} className="register update-password">
          <Password onSubmit={this.submit}/>

          <input type="submit" className="btn btn-danger"
                 value={formatMessage({id:"forms.user.verification.submit"})}/>

        </Form> : null);
  }

});

export default Page(injectIntl(Verification), {title: "user.verification.pageTitle"});
