import React from 'react';
import ReactFireMixin from 'reactfire';
import Formsy from 'formsy-react';
import _ from 'lodash';
import {FormattedMessage,intlShape,injectIntl} from 'react-intl';
import InputField from './Input';
import SelectField from './Select';
import Loader from '../Loader';

//components
const PreferencesInput = React.createClass({
  mixins: [ReactFireMixin],

  propTypes: {
    className: React.PropTypes.string,
    value: React.PropTypes.object,
    name: React.PropTypes.string,
    title: React.PropTypes.string,
    intl: intlShape.isRequired,
    editMode: React.PropTypes.bool
  },
  getDefaultProps: function(){
    return {
      editMode: false
    }
  },
  getInitialState: function(){
    return {
      types: [],
      loaded: false,
      type: null,
      preferences: this.props.value ? this.props.value.preferences : []
    }
  },
  componentWillMount: function(){
    firebase.database().ref(`types`).once('value')
      .then((snapshot)=>{
        this.setState({loaded: true, types: snapshot.val()})
      })
  },
//  shouldComponentUpdate: function(nextProps, nextState){
//    return nextProps.value !== this.props.value || nextState.value !== this.state.value;
//  },

  updatePrefrences: function(event){
    let selectedType = event.currentTarget.value;
    let typeObject = _.find(this.state.types, function(t, k){
      return k === selectedType
    });
    console.log('preferences', typeObject.preferences);
    this.setState({type: selectedType, preferences: typeObject.preferences});
  },
  format: function(preferences){
    const propertyPrefrences = [];
    _.forEach(preferences, (v, k)=>{
      propertyPrefrences.push(
        <div className="col-md-3">
          <InputField key={`property-preference-${k}`}
                      placeholder={`property.preference.${k}`}
                      className="input-sm"
                      name={`preferences.${k}`}
                      value={this.props.editMode ? v : null}/>
        </div>)
    });

    return propertyPrefrences;
  },
  render: function(){
    if(!this.state.loaded)
      return <Loader title="loading"/>;

    const {formatMessage} = this.props.intl;
    const {type,preferences} = this.state;

    let propertyPrefrences = null;
    if(type && !_.isEmpty(preferences)){
      propertyPrefrences = this.format(preferences);
    }

    let types = [];
    types.push({value: null, title: formatMessage({id: "forms.generic.select"})});
    _.forEach(this.state.types, function(v, k){
      types.push({value: k, title: formatMessage({id: `types.${k}`})});
    });
    return (
      <div>

        <div className="form-group clearfix">
          <SelectField
            title={this.props.title}
            className="col-md-3"
            onChange={this.updatePrefrences}
            value={type || null}
            validationErrors={{
                    isExisty: formatMessage({id: "forms.validations.generic.required"})
                    }}
            validations={{
                    isExisty:true
                    }}
            options={types}
            name={'type'}/>
        </div>

        {propertyPrefrences}

      </div>
    );
  }

});


export default injectIntl(PreferencesInput);
