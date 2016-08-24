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
    Firebase.database().ref('purposes').once('value', snapshot => this.setState({
      loaded: true,
      locations: snapshot.val()
    }));
  },
  render: function(){
    const {formatMessage} = this.props.intl;
    const purposes = [];

    if(!this.state.loaded){
      return <Loader title="loading"/>
    }
    forEach(this.state.locations, (v, k)=>{
      purposes.push({value: k, label: formatMessage({id: `purposes.${k}`})});
    });


    return (
      <Select
        placeholder={formatMessage({id:"filters.purposeField"})}
        className="location selectBox selectBox-dropdown"
        name="form-field-location"
        options={purposes}
        searchable={false}
        onChange={(d)=>{this.updateSearch({
                location:d
                })}}
      />
    )
  }

});

export default injectIntl(Location);
