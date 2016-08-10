import React from 'react';
import { Link } from 'react-router';
import { Form } from 'formsy-react';
import Firebase from 'firebase';
import { hashHistory } from 'react-router';
import {FormattedMessage,intlShape, injectIntl} from 'react-intl';
import qwest from 'qwest';
import constants from '../constants';
import {Page} from './containers/Page';
import progress from 'nprogress';
// form components
import InputField from './form/Input';
import AccountTypes from './form/AccountTypes';
import SelectField from './form/Select';

const Registration = React.createClass({
  contextTypes: {
    lang: React.PropTypes.string,
    pushNotification: React.PropTypes.func
  },
  getInitialState: function(){
    return {
      validationErrors: {},
      formResult: null,
      canSubmit: false
    };
  },
  disableSubmitButton: function(){
    this.setState({canSubmit: false});
  },
  enableSubmitButton: function(){
    this.setState({canSubmit: true});
  },
  validateForm: function(values){
//    let {formatMessage} = this.props.intl;
//
//    let validation = {};
//    switch(true){
//      case !values.fname:
//        validation.fname = formatMessage({id: "forms.validation.generic.required"});
//        break;
//      case !values.email:
//        validation.email = formatMessage({id: "forms.validation.generic.required"});
//        break;
//      case !values.password:
//        validation.password = formatMessage({id: "forms.validation.generic.required"});
//        break;
//      case !values.repeatPassword:
//        validation.repeatPassword = formatMessage({id: "forms.validation.generic.required"});
//        break;
//      case values.repeatPassword !== values.password:
//        validation.repeatPassword = formatMessage({id: "forms.validation.user.passwordMatch"});
//        break;
//      default:
//        validation = {};
//    }
//
//    this.setState({
//      validationErrors: validation
//    });
  },
  submit: function(data){
    let {formatMessage} = this.props.intl;

    if(this.refs.form.state.isValid){
      progress.start();

      qwest.post(`${constants.BE}user/register`, {
        email: data.email,
        fname: data.fname,
        lang: this.props.params.lang,
        type: data.userType
      }).then(()=>{
        progress.done();
        this.setState({showSuccess: true});

        // redirect to homepage
        //hashHistory.push(this.context.lang);
      }).catch((e)=>{
        progress.done();
        this.context.pushNotification({
          message: formatMessage({id: 'forms.user.register.errors.addUser'}),
          level: 'error'
        });

        // TOOD: delete created user
      });
    }
//    else{
//      this.context.pushNotification({message: formatMessage({id: 'forms.validations.correctErrors'}), level: 'error'});
//    }

  },
  render: function(){
    let {formatMessage} = this.props.intl;
    let RegisterForm = <Form preventExternalInvalidation ref="form" onValidSubmit={this.submit} className="register">

      <div className="row">
        <InputField className="col-md-6" placeholder={"forms.user.register.fields.firstName"} name="fname"
                    value={null}
                    validationErrors={{
                    isExisty: formatMessage({id: "forms.validations.generic.required"})
                    }}
                    validations={{
                    isExisty:true
                    }}
                    required/>

        <InputField className="col-md-6" placeholder={"forms.user.register.fields.email"} name="email"
                    value={null}
                    validationErrors={{
                     isEmail: formatMessage({id: "forms.validations.generic.isEmail"}),
                     isExisty: formatMessage({id: "forms.validations.generic.required"})
                     }} validations={{
                    isExisty:true,
                    isEmail:true
                    }} required/>

      </div>

      <div className="row">
        <div className="col-md-12">
          <h6 className="fieldset-title">
            <FormattedMessage id="forms.user.register.fields.accountType"/>
          </h6>
          <div className="input-group">
            <AccountTypes />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <input type="submit" className="btn btn-danger" formNoValidate={true}
                 value={formatMessage({id:"forms.user.register.submit"})}/>
        </div>
      </div>
    </Form>;


    return (
      <div className="row">
        <div className="col-md-12">
          {this.state.showSuccess ? <div>
            <FormattedMessage id="screen.user.register.waitVerification"/>
          </div> : RegisterForm}

        </div>
      </div>
    )
  }

});


export default Page(injectIntl(Registration), {title: "screen.user.register.pageTitle"});
