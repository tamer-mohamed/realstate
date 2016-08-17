import React from 'react';
import {hashHistory,Link} from 'react-router';
import qwest from 'qwest';
import auth from '../utils/auth';
import {intlShape, injectIntl,FormattedMessage} from 'react-intl';
import {Form} from 'formsy-react';
import InputField from './form/Input';

const ForgetPassword = React.createClass({
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

  submit: function(values, reset){
    const {formatMessage} = this.props.intl;
    auth.sendResetPassword(values.email).then(_=>{
      this.context.pushNotification({message: formatMessage({id: "user.forgetPassword.success"}), level: 'success'});
      hashHistory.push(`${this.props.params.lang}`);
    }).catch(e=>{
      this.context.pushNotification({message: formatMessage({id: e.code}), level: 'error'});

    });
  },


  render: function(){
    const {formatMessage} = this.props.intl;
    return (
      <div className="page-wrap">

        <div className="container">
          <div className="page-contents">
            <h2 className="page-title">{formatMessage({id: "user.forgetPassword.pagetitle"})}</h2>
            <div className="row">
              <Form preventExternalInvalidation onValidSubmit={this.submit}>
                <div className="row">

                  <InputField type="text"
                              className="col-md-6"
                              value={null}
                              name="email"
                              placeholder="user.login.email"
                              validations={{
                             isExisty:true,
                             isEmail:true
                             }}
                              validationErrors={{
                             isExisty:formatMessage({id:"forms.validations.generic.required"}),
                             isEmail:formatMessage({id:"forms.validations.generic.isEmail"})
                             }}
                              required/>
                  <div className="col-md-12">
                    <input type="submit"
                           formNoValidate={true}
                           className="btn btn-danger"
                           value={formatMessage({id:"user.forgetPassword.submit"})}/>
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


export default injectIntl(ForgetPassword);
