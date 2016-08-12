import React from 'react';
import ReactFireMixin from 'reactfire';
import firebase from 'firebase';
import _ from 'lodash';
import PropertySingleSlider from './PropertySingleSlider';
import {FormattedMessage,intlShape,injectIntl,FormattedHTMLMessage} from 'react-intl';
import { Link } from 'react-router';
import Nearby from './NearbyProperties';


const PropertySingle = React.createClass({
  mixins: [ReactFireMixin],
  propTypes: {propertyId: React.PropTypes.object},
  getInitialState: function(){
    return {
      locationData: {},
      propertyDetails: {},
      loaded: false,
      purpose: ""
    }
  },
  componentWillMount: function(){
    firebase.database().ref(`properties/${this.props.params.propertyId}`).once('value', (dataSnapshot)=>{
      let property = dataSnapshot.val();
      this.setState({loaded: true, propertyDetails: property});

    });
  },
  render: function(){
    if(!this.state.loaded)
      return null;


    const {formatMessage} = this.props.intl;
    let spaceMeasure = this.props.intl.formatHTMLMessage({id: "settings.space"});
    let property = this.state.propertyDetails;

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
              purposeId={property.purpose}
              purposeText={formatMessage({id:`purposes.${property.purpose}`})}
              FBref={`images/${this.props.params.propertyId}`}
              images={this.state.propertyDetails.images}/>

            <div className="col-md-5 property-data">
              <div className="prop-features prop-before">
                  <span className="location">
                    {formatMessage({id: `locations.${this.state.propertyDetails.location}`})}
                    ({formatMessage({id: `areas.${this.state.propertyDetails.area}`})})</span>
                  <span className="area">
                    <FormattedHTMLMessage id="property.space"
                                          values={{space:this.state.propertyDetails.space,measure:spaceMeasure}}/> <sup>2</sup>
                  </span>
              </div>
              <div className="prop-price">
                <strong className="price">
                  {this.state.propertyDetails.price}
                  <FormattedMessage id="settings.currency"/>
                </strong>
                <Link className="btn btn-danger"
                      to={`${this.props.params.lang}/user/profile/${this.state.propertyDetails.addedBy}`}>
                  <FormattedMessage id="contactAgent"/>
                </Link>
              </div>

              <div className="prop-features">
              </div>
            </div>
          </div>

          <div className="row">
            <Nearby id={this.props.params.propertyId} area={this.state.propertyDetails.area}/>
          </div>
        </div>
      </div>
    );

  }
});

export default injectIntl(PropertySingle);
