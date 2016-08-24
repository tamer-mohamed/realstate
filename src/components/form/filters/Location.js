import React from 'react';
import Firebase from 'firebase';
import {injectIntl} from 'react-intl';
import Select from 'react-select';
import Loader from '../../Loader';
import forEach from 'lodash/forEach';

const Location = React.createClass({
  getInitialState: function(){
    return {
      loaded: false,
      locations: []
    }
  },
  componentWillMount: function(){
    Firebase.database().ref('locations').once('value', snapshot => this.setState({
      loaded: true,
      locations: snapshot.val()
    }));
  },
  render: function(){
    const {formatMessage} = this.props.intl;
    const locations = [];

    if(!this.state.loaded){
      return <Loader title="loading"/>
    }
    forEach(this.state.locations, (v, k)=>{
      locations.push({value: k, label: formatMessage({id: `locations.${k}`})});
    });


    return (
      <Select
        placeholder={formatMessage({id:"filters.locationField"})}
        className="location selectBox selectBox-dropdown"
        name="form-field-location"
        options={locations}
        searchable={false}
        onChange={(d)=>{this.updateSearch({
                location:d
                })}}
      />
    )
  }

});

export default injectIntl(Location);
