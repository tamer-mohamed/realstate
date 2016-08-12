import React from 'react';
import firebase from 'firebase';
import _ from 'lodash';
import { IntlProvider, addLocaleData ,defineMessages} from 'react-intl';
import NotificationSystem from 'react-notification-system';
// components
import Header from './HeaderFront';
import Topbar from './Topbar';
import Footer from './Footer';
// messages
const messages = {
  ar: require('../locales/ar'),
  en: require('../locales/en')
};

//console.log(ar);
// Initialize Firebase
var config = {
  apiKey: "AIzaSyCKrocAcCrVXRNIGVLEcdLyO_jEF-RkBe0",
  authDomain: "project-3313342985754506611.firebaseapp.com",
  databaseURL: "https://project-3313342985754506611.firebaseio.com",
  storageBucket: "project-3313342985754506611.appspot.com",
};
firebase.initializeApp(config);


const App = React.createClass({
  intlData: function(){
    let localeData = messages[this.props.params.lang];

    defineMessages(localeData);
    addLocaleData(localeData);
    return localeData;
  },

  getInitialState: function(){
    return {
      loggedIn: null,
      lang: this.props.params.lang
    }
  },

  childContextTypes: {
    lang: React.PropTypes.string,
    user: React.PropTypes.any,
    pushNotification: React.PropTypes.func
  },
  propTypes: {children: React.PropTypes.object, lang: React.PropTypes.string},

  getChildContext: function(){
    return {
      lang: this.props.params.lang,
      user: firebase.auth().currentUser,
      pushNotification: ({message, level})=>{
        event.preventDefault();
        this.refs.notificationSystem.addNotification({
          message,
          level
        });
      }
    };
  },
  handleLogout: function(loggedIn){
    this.setState({
      loggedIn: loggedIn
    });
  },

  componentWillMount: function(){
    firebase.auth().onAuthStateChanged((user)=>{
      this.handleLogout(user);
    });
  },
  render: function(){
    const localeData = this.intlData();

    if(localeData.locale === 'ar')
      document.body.classList.add('rtl')
    else
      document.body.classList.remove('rtl')

    return (
      <IntlProvider {... localeData} defaultLocale="ar">

        <div className={localeData.className}>
          <NotificationSystem ref="notificationSystem"/>
          <Topbar/>
          <Header/>
          <section>
            {this.props.children}
          </section>
          <Footer lang={this.props.params.lang}/>
        </div>
      </IntlProvider>
    )
  }
});

export default App;
