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
    Firebase.database().ref('types').once('value', snapshot => this.setState({
      loaded: true,
      locations: snapshot.val()
    }));
  },
  render: function(){
    const {formatMessage} = this.props.intl;
    const types = [];

    if(!this.state.loaded){
      return <Loader title="loading"/>
    }
    forEach(this.state.locations, (v, k)=>{
      types.push({value: k, label: formatMessage({id: `types.${k}`})});
    });


    return (
      <Select
        placeholder={formatMessage({id:"filters.typeField"})}
        className="location selectBox selectBox-dropdown"
        name="form-field-location"
        options={types}
        searchable={false}
        onChange={(d)=>{this.updateSearch({
                location:d
                })}}
      />
    )
  }

});

export default injectIntl(Location);
