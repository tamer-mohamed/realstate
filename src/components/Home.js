import React from 'react';
import ReactFireMixin from 'reactfire';
import firebase from 'firebase';
import {FormattedMessage, FormattedNumber, FormattedRelative , injectIntl} from 'react-intl';
import NProgress from "nprogress";
import {Link,hashHistory} from 'react-router';
import _ from 'lodash';
//components
import FeaturedSlider from './Featured';
import Filter from './Filter';
import PropertiesContainer from './PropertiesContainer';
import Pagination from './Pagination';

const Home = React.createClass({
  mixins: [ReactFireMixin],
  contextTypes: {
    lang: React.PropTypes.string,
  },
  getInitialState: function(){
    return {
      // propertiesList: [],
      page: this.props.params.page || 1,
      itemsPerPage: 4,
      loaded: false,
      filteredData: [],
      isSearchEnabled: false
    }
  },
  fetchData: function({start,end}){
    NProgress.start();

    console.log(start);
    firebase.database().ref('properties').orderByPriority().startAt(undefined).limitToFirst(end).once('value', snapshot=>{
      NProgress.done();

      console.log('Properties LOADED', snapshot.val());

      this.setState({loaded: true, properties: snapshot.val()})

      firebase.database().ref('properties').once('value', (snapshot)=>{
        this.setState({length: snapshot.numChildren()});
      })
    })
  },
  componentWillMount: function(){
    const {mode,oobCode} = this.props.location.query;
    const {itemsPerPage , page} = this.state;


    switch(mode){
      case "resetPassword":
        hashHistory.push(`${this.context.lang}/user/confirmResetPassword/${oobCode}`);
        break;

      default:
        this.fetchData({start: itemsPerPage * (page - 1), end: itemsPerPage});
    }

  },
  componentWillUnmount: function(){
    //this.unbind('propertiesList');
  },


  componentDidMount: function(){
    const {formatMessage} = this.props.intl;

    document.title = formatMessage({id: "settings.sitename"});
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
    let pages = Math.ceil(this.state.length / this.state.itemsPerPage);


    return (
      <div>
        <Filter submitSearch={this.submitSearch}/>
        <PropertiesContainer data={data}/>
        <Pagination num={pages} current={this.state.page} baseURL={`${this.props.params.lang}/home`}/>

        <div className="full-width call-action">
          <div className="container">
            <div className="row">
              <div className="col-md-9">
                <h4>
                  <FormattedMessage id="block.submitProperty.text"/>
                </h4>
              </div>
              <div className="col-md-3">
                <Link to={`${this.context.lang}/user/dashboard/properties/add`}
                      className="btn btn-danger"><FormattedMessage id="block.submitProperty.buttonText"/></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )

  }
});

export default injectIntl(Home);
