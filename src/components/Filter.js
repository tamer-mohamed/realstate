import React from 'react';
//import RangeSlider from './RangeSlider';
import ReactFireMixin from 'reactfire';
import Firebase from 'firebase';
import Select from 'react-select';
import $ from 'jquery';
import {intlShape, injectIntl} from 'react-intl';

const Filter = React.createClass({
  mixins: [ReactFireMixin],

  propTypes: {
    intl: intlShape.isRequired
  },
  getInitialState: function(){
    return {
      locations: [],
      areas: [],
      property: {
        purpose: null,
        location: null,
        type: null
      },
      searchResults: {
        entries: 0,
        results: null
      }
    }
  },

  updateSearch: function(data){
    let property = this.state.property;
    for(let key in data){
      property[key] = data[key];
    }
    this.setState({property});
  },

  resetSearchResults: function(){
    // reset search results state
  },

  componentWillMount: function(){
    this.bindAsArray(Firebase.database().ref('locations'), "locations");

    //this.bindAsArray(Firebase.database().ref("areas"), "areas");

    this.bindAsArray(Firebase.database().ref("purposes"), "purposes");

    this.bindAsArray(Firebase.database().ref("types"), "types");
  },

  componentDidMount: function(){
  },
  componentDidUpdate: function(){
  },

  componentWillUnmount: function(){
  },

  render: function(){

    const {formatMessage} = this.props.intl;

    let locations = this.state.locations.map(function(result){
      return {value: result['.key'], label: formatMessage({id: `locations.${result['.value']}`})};
    });

//    let areas = this.state.areas.map(function(result){
//      return {value: result['.key'], label: result['.value']};
//    });


    let purposes = this.state.purposes.map(function(result){
      return {value: result['.key'], label: formatMessage({id: `purposes.${result['.value']}`})};
    });

    let types = this.state.types.map(function(result){
      return {value: result['.key'], label: formatMessage({id: `types.${result['.value']}`})};
    });

    return (
      <div className="container">
        <div className="filter">


          <div className="row">
            <div className="col-md-4">
              <Select
                placeholder={formatMessage({id:"filters.locationField"})}
                className="location selectBox selectBox-dropdown"
                name="form-field-location"
                value={this.state.property.location}
                options={locations}
                searchable={false}
                onChange={(d)=>{this.updateSearch({
                location:d
                })}}
              />
            </div>

            <div className="col-md-4">
              <Select
                placeholder={formatMessage({id:"filters.typeField"})}
                className="type selectBox selectBox-dropdown"
                name="form-field-type"
                value={this.state.property.type}
                options={types}
                searchable={false}
                onChange={(d)=>{this.updateSearch({
                type:d
                })}}
              />
            </div>

            <div className="col-md-4">
              <Select
                placeholder={formatMessage({id:"filters.purposeField"})}
                className="cata selectBox selectBox-dropdown"
                name="form-field-purpose"
                value={this.state.property.purpose}
                options={purposes}
                searchable={false}
                onChange={(d)=>{this.updateSearch({
                purpose:d
                })
                }}
              />
            </div>

          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="pull-right">
                <button type="button" onClick={()=>{this.props.submitSearch(this.state.property)}} className="adv-srch"
                        className="btn"><i className="fa fa-search"/>
                  {formatMessage({id: "filters.submitButton"})}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
});
export default injectIntl(Filter);
