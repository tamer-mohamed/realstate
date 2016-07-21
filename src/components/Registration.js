import React from 'react';
import { Link } from 'react-router';
import { Form } from 'formsy-react';
import Firebase from 'firebase';
import { If, Then, Else } from 'react-if';
import { hashHistory } from 'react-router';
import {FormattedMessage,intlShape, injectIntl} from 'react-intl';
// form components
import InputField from './form/Input';
import RadioGroup from './form/RadioGroup';
import SelectField from './form/Select';

const Registration = React.createClass({
  getInitialState: function(){
    return {
      validationErrors: {},
      formResult: null,
      canSubmit: false
    };
  },
  contextTypes: {
    lang: React.PropTypes.string
  },
  resetForm: function(){
    this.refs.form.reset();
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

    //reset errors
    this.setState({formResult: null});

    if(this.refs.form.state.isValid){
      Firebase.auth().createUserWithEmailAndPassword(data.email, data.password).then((user)=>{
        Firebase.database().ref(`users/${user.uid}`).set({
          fname: data.fname,
          type: 1
        }, (e)=>{
          if(e === null){
            this.setState({formResult: true});
            this.resetForm();
            // redirect to homepage
            hashHistory.push(this.context.lang);
          }
          else{
            this.setState({formResult: formatMessage({id: `forms.user.register.errors.addUser`})});
          }

        });

      }).catch((e)=>{
        this.setState({formResult: formatMessage({id: `forms.validations.${e.code}`})})
      });
    }
    else{
      this.setState({formResult: formatMessage({id: `forms.validations.correctErrors`})});
    }

  },
  render: function(){
    let {formatMessage} = this.props.intl;
    return (
      <div className="page-wrap">

        <div className="container">
          <div className="page-contents">


            <div className="row">
              <div className="col-md-12">
                <h2><FormattedMessage id="screen.user.register.pageTitle"/></h2>
              </div>
            </div>

            <div className="row">
              <div className="col-md-7">

                <Form ref="form" onSubmit={this.submit} className="register">


                  <If condition={this.state.formResult !== null}>
                    <Then>
                      <If condition={this.state.formResult === true}>
                        <Then>
                          <div className="col-md-12 alert alert-success">
                            <FormattedMessage id="forms.user.register.success"/>
                          </div>
                        </Then>

                        <Else>
                          <div className="col-md-12 alert alert-danger">
                            {this.state.formResult}
                          </div>
                        </Else>
                      </If>
                    </Then>
                  </If>


                  <div className="row">
                    <InputField className="col-md-6" title={"forms.user.register.fields.firstName"} name="fname"
                                required/>

                    <InputField className="col-md-6" title={"forms.user.register.fields.email"} name="email"
                                validationErrors={{
                     isEmail: formatMessage({id: "forms.validation.generic.email"})
                     }} validations="isEmail" required/>

                  </div>

                  <div className="row">
                    <InputField className="col-md-6" title={"forms.user.register.fields.password"}
                                name="password"
                                type="password"
                                validations={{
                                minLength: 7
                              }} validationErrors={{
                                minLength: 'You can not type in less than 10 characters'
                              }} required/>

                    <InputField className="col-md-6" title={"forms.user.register.fields.repeatPassword"}
                                type="password"
                                name="repeatPassword" validations="equalsField:password"
                                validationErrors={{
                                equalsField: 'password has to match'
                              }} required/>

                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <h6 className="fieldset-title">
                        <FormattedMessage id="forms.user.register.fields.accountType"/>
                      </h6>
                      <div className="input-group">
                        <RadioGroup items={[{".key":1,".value":"Individual"}, {".key":1,".value":"Business"}]}
                                    value={0}
                                    name="userType"/>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <input type="submit" className="btn btn-primary"
                             value={formatMessage({id:"forms.user.register.submit"})}/>
                    </div>
                  </div>
                </Form>
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }

});


export default injectIntl(Registration);
