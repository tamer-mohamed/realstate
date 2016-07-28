import React from 'react';
import ReactFireMixin from 'reactfire';
import { Form } from 'formsy-react';
import Firebase from 'firebase';
import NProgress from "nprogress";
import { If, Then, Else } from 'react-if';
import {FormattedMessage,intlShape, injectIntl} from 'react-intl';
import {hashHistory} from 'react-router';
import _ from 'lodash';
import NotificationSystem from 'react-notification-system';
// form components
import PropertyForm from '../form/PropertyForm';
import Loader from '../Loader';


//components
const PropertyAdd = React.createClass({
  mixins: [ReactFireMixin],
  propTypes: {
    intl: intlShape.isRequired
  },
  contextTypes: {
    user: React.PropTypes.any,
    lang: React.PropTypes.string,
    pushNotification: React.PropTypes.func
  },
  getInitialState: function(){
    return {
      property: {},
      loaded: false
    };
  },
  componentWillMount: function(){
    let propertyId = this.props.params.propId;
    NProgress.start();

    firebase.database().ref(`properties/${propertyId}`).once('value', (snapshot)=>{
      NProgress.done();
      let value = snapshot.val();
      this.setState({loaded: true, property: value})
    });

  },
  submit: function(data){
    let {formatMessage} = this.props.intl;

    console.log('Manage property Data', data);
    console.log(`properties/${this.props.params.propId}`);
    Firebase.database().ref(`properties/${this.props.params.propId}`).update({
      title: data.title,
      location: data.location,
      price: data.price,
      area: data.area,
      space: data.space,
      type: data.type.type,
      preferences: data.preferences,
      purpose: data.purpose,
      images: data.propertyImages,
      addedBy: this.context.user.uid
      //updatedAt: Firebase.ServerValue.TIMESTAMP
    }).then(()=>{
      this.context.pushNotification({message: formatMessage({id: "forms.property.success"}), level: 'success'});

      hashHistory.push(`${this.context.lang}/user/dashboard/properties`);
    }).catch((e)=>{
      window.alert("Error in Updating property:" + e);
    });

  },
  resetForm: function(){
    this.refs.form.reset();
  },
  render: function(){
    const property = this.state.property;

    return (

      <div className="page-wrap">
        <div className="container">
          <div className="page-contents">
            <h2 className="page-title">
              <FormattedMessage id="screen.secure.properties.manage.pageTitle"/></h2>
            <div className="row">
              {this.state.loaded ?
                <PropertyForm onSubmit={this.submit} editMode={true} property={property}
                              propId={this.props.params.propId}/>
                : null
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default injectIntl(PropertyAdd);
