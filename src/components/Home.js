import React from 'react';
import ReactFireMixin from 'reactfire';
import firebase from 'firebase';
import {FormattedMessage, FormattedNumber, FormattedRelative} from 'react-intl';
import NProgress from "nprogress";
import _ from 'lodash';
//components
import FeaturedSlider from './Featured';
import Filter from './Filter';
import PropertiesContainer from './PropertiesContainer';

const Home = React.createClass({
  mixins: [ReactFireMixin],
  getInitialState: function(){
    return {
      // propertiesList: [],
      loaded: false,
      filteredData: [],
      isSearchEnabled: false
    }
  },
  componentWillMount: function(){
    NProgress.start();
    firebase.database().ref('properties').once('value', (snapshot)=>{
      NProgress.done();
      let value = snapshot.val();
      this.setState({loaded: true, properties: value});
    });
  },

  componentWillUnmount: function(){
    //this.unbind('propertiesList');
  },
  isSearchParamsEmpty: function(data){
    let isEmpty = true;

    for(let key in data){
      if(data.hasOwnProperty(key)){
        if(data[key] && data[key].value !== 'undfined'){
          isEmpty = false;
          break;
        }

      }
    }

    return isEmpty;
  },
  submitSearch: function(data){

    if(this.isSearchParamsEmpty(data)) this.setState({isSearchEnabled: false});

    else{
      let filteredData = _.filter(this.state.properties, function(p){

        let matchedLocation, matchedPurpose, matchedType;

        if(data.location === null)
          matchedLocation = true;
        else
          matchedLocation = p.location === data.location.value;


        if(data.purpose === null)
          matchedPurpose = true;
        else
          matchedPurpose = p.purpose === data.purpose.value;


        if(data.type === null)
          matchedType = true;
        else
          matchedType = p.type === data.type.value;

        return matchedLocation && matchedPurpose && matchedType;
      });
      this.setState({filteredData: filteredData, isSearchEnabled: true});
    }


  },
  render: function(){

    let data = this.state.isSearchEnabled ? this.state.filteredData : this.state.properties;
    return (
      <div>
        <Filter submitSearch={this.submitSearch}/>
        <PropertiesContainer data={data}/>
        <div className="full-width call-action">
          <div className="container">
            <div className="row">
              <div className="col-md-9">
                <h4>
                  <FormattedMessage id="block.submitProperty.text"/>
                </h4>
              </div>
              <div className="col-md-3">
                <a href="contact.html" className="btn btn-danger">
                  <FormattedMessage id="block.submitProperty.buttonText"/>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )

  }
});

export default Home;
