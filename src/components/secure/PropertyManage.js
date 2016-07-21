import React from 'react';
import ReactFireMixin from 'reactfire';
import { Form } from 'formsy-react';
import Firebase from 'firebase';
import { If, Then, Else } from 'react-if';
import {FormattedMessage,intlShape, injectIntl} from 'react-intl';
import {hashHistory} from 'react-router';
import _ from 'lodash';
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
    lang: React.PropTypes.string
  },
  getInitialState: function(){
    return {
      property: {},
      loaded: false,
    };
  },
  componentWillMount: function(){
    let propertyId = this.props.params.propId;

    firebase.database().ref(`properties/${propertyId}`).once('value', (snapshot)=>{
      let value = snapshot.val();
      this.setState({loaded: true, property: value})
    });

  },
  submit: function(data){
    firebase.database().ref(`properties/${this.props.params.propId}`).update({
      title: data.title,
      location: data.location,
      price: data.price,
      area: data.area,
      space: data.space,
      type: data.type.type,
      preferences: data.preferences,
      purpose: data.purpose.value,
      addedBy: this.context.user.uid,
      updatedAt: new Date()
    }).then(()=>{
      hashHistory.push(`${this.context.lang}/user/dashboard/properties`);
    }).catch((e)=> window.alert(e));

  },
  resetForm: function(){
    this.refs.form.reset();
  },
  render: function(){
    const property = this.state.property;

    if(!this.state.loaded)
      return <Loader title="Loading"/>

    return (
      <div className="page-wrap">

        <div className="container">
          <div className="page-contents">
            <h2 className="page-title">
              <FormattedMessage id="screen.secure.properties.manage.pageTitle"/></h2>
            <div className="row">
              <PropertyForm onSubmit={this.submit} editMode={true} property={property}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default injectIntl(PropertyAdd);
