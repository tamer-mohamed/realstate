import React from 'react';
import Firebase from 'firebase';
import {hashHistory,Link} from 'react-router';
import auth from '../utils/auth';
import {intlShape, injectIntl,FormattedMessage} from 'react-intl';
import {Form} from 'formsy-react';
import InputField from './form/Input';

const Login = React.createClass({
  propTypes: {
    intl: intlShape.isRequired
  },
  contextTypes: {
    lang: React.PropTypes.string,
    pushNotification: React.PropTypes.func
  },
  getInitialState: function(){
    return {
      loginInfo: {
        email: null,
        password: null
      },
      loginResult: null

    }
  },

  updateInfo: function({email,password}){
    let loginInfo = this.state.loginInfo;

    if(email) loginInfo.email = email;

    if(password) loginInfo.password = password;

    this.setState({loginInfo});
  },

  submitLogin: function(values){
    const {formatMessage} = this.props.intl;
    const {email,password} = values;
    auth.login(email, password).then((user)=>{
      hashHistory.push(`${this.props.params.lang}`);
    }).catch((e)=>{
      this.context.pushNotification({message: formatMessage({id: e.code}), level: 'error'});
    });
  },


  render: function(){
    const {formatMessage} = this.props.intl;
    return (
      <div className="page-wrap">

        <div className="container">
          <div className="page-contents">
            <h2 className="page-title">{formatMessage({id: "user.login.pagetitle"})}</h2>
            <div className="row">
              <Form preventExternalInvalidation onValidSubmit={this.submitLogin}>
                <div className="row">
                  <InputField type="text"
                              className="col-md-6"
                              value={null}
                              name="email"
                              placeholder="user.login.email"
                              validations={{
                             isExisty:true
                             }}
                              validationErrors={{
                             isExisty:formatMessage({id:"forms.validations.generic.required"})
                             }}
                              required/>

                  <InputField type="password"
                              className="col-md-6"
                              value={null}
                              name="password"
                              placeholder="user.login.password"
                              validations={{
                             isExisty:true
                             }}
                              validationErrors={{
                             isExisty:formatMessage({id:"forms.validations.generic.required"})
                             }}
                              required/>

                  <div className="col-md-12">
                    <input type="submit"
                           formNoValidate={true}
                           className="btn btn-danger"
                           value={formatMessage({id:"forms.users.login.submit"})}/>

                    <Link className="btn" to={`${this.props.params.lang}/user/forgetPassword`}><FormattedMessage
                      id="user.login.forgetPassword"/></Link>
                  </div>

                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }

});


export default injectIntl(Login);
