import React from 'react';
import ReactFireMixin from 'reactfire';
import firebase from 'firebase';
import PropertySingleSlider from './PropertySingleSlider';
import {FormattedMessage,intlShape,injectIntl,FormattedHTMLMessage} from 'react-intl';
import { Link } from 'react-router';


const PropertySingle = React.createClass({
  mixins: [ReactFireMixin],
  propTypes: {propertyId: React.PropTypes.object},
  getInitialState: function(){
    return {
      locationData: {},
      propertyDetails: {},
      purpose: ""
    }
  },
  componentWillMount: function(){
    firebase.database().ref(`properties/${this.props.params.propertyId}`).once('value', (dataSnapshot)=>{
      this.setState({propertyDetails: dataSnapshot.val()});
      this.getLocation();
      this.getPurpose();
    });
  },
  getLocation: function(){
    let locationData = {location: null, area: null};

    if(typeof this.state.propertyDetails !== 'undefined'){
      firebase.database().ref(`locations/${this.state.propertyDetails.location}`).once('value', (dataSnapshot)=>{
        locationData.location = dataSnapshot.val();
        firebase.database().ref(`areas/${this.state.propertyDetails.location}/${this.state.propertyDetails.area}`).once('value', (dataSnapshot)=>{
          locationData.area = dataSnapshot.val();

          this.setState({locationData});
        });
      });
    }


  },
  getPurpose: function(){
    firebase.database().ref(`purposes/${this.state.propertyDetails.purpose}`).once('value', (dataSnapshot)=>{
      this.setState({purpose: dataSnapshot.val()});
    });
  },
  render: function(){
    let spaceMeasure = this.props.intl.formatHTMLMessage({id: "settings.space"});

    if(this.state.propertyDetails){
      return (
        <div className="page-wrap properties-page property-single">

          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h2 className="page-title">{this.state.propertyDetails.title}</h2>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row">
              <PropertySingleSlider
                className="col-md-7 property-slider"
                purpose={this.state.purpose}
                FBref={`images/${this.props.params.propertyId}`}
                images={this.state.propertyDetails.images}/>

              <div className="col-md-5 property-data">
                <div className="prop-features prop-before">
                  <span className="location">{this.state.locationData.location} ({this.state.locationData.area})</span>
<<<<<<< HEAD
                  <span className="area">{this.state.propertyDetails.space} m<sub>2<sub></span>
=======
                  <span className="area"> <FormattedHTMLMessage id="property.space"
                                                                values={{space:this.state.propertyDetails.space,measure:spaceMeasure}}/> <sup>2</sup></span>
>>>>>>> origin/dev
                </div>
                <div className="prop-price">
                  <strong className="price">
                    {this.state.propertyDetails.price}
                    <FormattedMessage id="settings.currency"/>
                  </strong>

                </div>
                <a href="" className="btn btn-danger"> <FormattedMessage id="contactAgent"/></a>


                <div className="prop-features">
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return null;

  }
});

export default injectIntl(PropertySingle);
