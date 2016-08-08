import React from 'react';
import Firebase from 'firebase';
import {hashHistory} from 'react-router';
import auth from '../utils/auth';
import {intlShape, injectIntl,FormattedMessage} from 'react-intl';

const Login = React.createClass({
  propTypes: {
    intl: intlShape.isRequired,
  },
  contextTypes: {
    lang: React.PropTypes.string
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

  renderResult: function(state, e){
    let result;
    if(state){
      result =
        <div className="alert alert-success" role="alert">You have successfully logged in, you will be redirected to the
          homepage.</div>;
      setTimeout(()=>{
        // redirect to homepage
        hashHistory.push(this.context.lang);
      }, 5000);
    }
    else{
      result = <div className="alert alert-danger" role="alert">{e.code}</div>;
    }

    this.setState({loginResult: result});
    return result;
  },

  submitLogin: function(e){
    e.preventDefault();

    // reset result
    this.setState({loginResult: null});

    let {email,password} = this.state.loginInfo;
    auth.login(email, password, function(e){
      if(e){
        console.error("User didn't login, Error:", e);
        this.renderResult(false, e);
      }
      else{
        console.log('Logged', user);

        this.renderResult(true);
      }

    });
  },


  render: function(){
    const {formatMessage} = this.props.intl;
    return (
      <div className="page-wrap">

        <div className="container">
          <div className="page-contents">
            <h2 className="page-title">Login</h2>
            <div className="row">
              <form action="#">
                {this.state.loginResult || ""}
                <div className="row">
                  <div className="col-md-6">
                    <div className="input-group input-group-lg">
                      <span className="input-group-addon" id="sizing-addon1"><FormattedMessage
                        id="user.login.email"/></span>
                      <input type="text" className="form-control" placeholder="jhon@smith.com"
                             aria-describedby="sizing-addon1" onChange={(e)=>this.updateInfo({email:e.target.value})}/>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-group input-group-lg">
                  <span className="input-group-addon" id="sizing-addon1"
                        value={this.state.loginInfo.password}><FormattedMessage id="user.login.password"/></span>
                      <input type="password" className="form-control" placeholder="****"
                             aria-describedby="sizing-addon1"
                             onChange={(e)=>this.updateInfo({password:e.target.value})}/>
                    </div>
                  </div>

                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="input-group input-group-lg">
                      <input type="submit" className="btn btn-danger" onClick={this.submitLogin}
                             value={formatMessage({id:"forms.users.login.submit"})}/>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

});


export default injectIntl(Login);
