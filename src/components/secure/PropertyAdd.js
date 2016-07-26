import React from 'react';
import ReactFireMixin from 'reactfire';
import { Form } from 'formsy-react';
import Firebase from 'firebase';
import _ from 'lodash';
import {FormattedMessage,intlShape, injectIntl} from 'react-intl';
import PropertyForm from '../form/PropertyForm';


const PropertyAdd = React.createClass({
  mixins: [ReactFireMixin],
  propTypes: {
    intl: intlShape.isRequired,
  },
  contextTypes: {
    user: React.PropTypes.any,
    pushNotification: React.PropTypes.func
  },
  getInitialState: function(){
    return {
      formResult: null,
      propertyValues: {},
      featuredLevels: []
    };
  },
  submit: function(values){
    let {formatMessage} = this.props.intl;
    let data = values;


    Firebase.database().ref('properties').push({
      title: data[1].title,
      location: data[1].location.value,
      price: data[1].price,
      area: data[1].area,
      space: data[1].space,
      type: data[1].type.type,
      preferences: data[1].preferences,
      purpose: data[1].purpose.value,
      featuredLevel: data[2],
      addedBy: this.context.user.uid,
      addedAt: Firebase.ServerValue.TIMESTAMP
    }, (e)=>{
      if(e === null){
        this.context.pushNotification({message: formatMessage({id: "forms.property.success"}),level:'success'});
      }
      else{
        this.context.pushNotification({message: formatMessage({id: "forms.errors.property.add"}),level:'error'});
      }
    })

  },
  render: function(){
    return (
      <div className="page-wrap">

        <div className="container">
          <div className="page-contents">
            <h2 className="page-title">
              <FormattedMessage id="screen.secure.properties.add.pageTitle"/></h2>
            <div className="row">
              <PropertyForm onSubmit={this.submit}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default injectIntl(PropertyAdd);
