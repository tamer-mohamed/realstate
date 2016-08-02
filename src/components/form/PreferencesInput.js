import React from 'react';
import ReactFireMixin from 'reactfire';
import Formsy from 'formsy-react';
import _ from 'lodash';
import {FormattedMessage,intlShape} from 'react-intl';
import InputField from './Input';

//components
const PreferencesInput = React.createClass({
  mixins: [ReactFireMixin, Formsy.Mixin],

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
  componentWillMount: function(){
    this.bindAsArray(firebase.database().ref(`types`), 'types');
  },
//  shouldComponentUpdate: function(nextProps, nextState){
//    return nextProps.value !== this.props.value || nextState.value !== this.state.value;
//  },

  updatePrefrences: function(event){
    if(this.props.onChange)
      this.props.onChange(event);

    let selectedType = event.currentTarget.value;
    let typeObject = _.find(this.state.types, function(t){
      return t['.key'] === selectedType
    });

    this.setValue({type: typeObject['.key'], preferences: typeObject.preferences});
  },
  render: function(){
    const {formatMessage} = this.props.intl;
    const className = (this.props.className || ' ') + " " +
      (this.showRequired() ? 'required' : this.showError() ? 'error' : '');
    const errorMessage = this.getErrorMessage();

    const currentValue = this.getValue();

    let propertyPrefrences = [];
    if(currentValue && currentValue.preferences && !_.isEmpty(currentValue.preferences)){
      console.log('CURRENT', currentValue.preferences);
      _.forEach(currentValue.preferences, (v, k)=>{
        propertyPrefrences.push(
          <InputField key={`property-preference-${k}`} className="col-md-3"
                      title={`property.preference.${k}`}
                      name={`property-preference-${k}`}
                      value={this.props.editMode && v === parseInt(v, 10)? v : 0} required/>)
      });
    }
    const options = this.state.types.map((option, i) => (
      <option key={' property-type-'+i} value={option['.key']}>
        {option['title']}
      </option>
    ));


    options.unshift(
      <option key={' types-option-null'} value={''}>
        {formatMessage({id: "forms.generic.select"})}
      </option>
    );


    const labelClassName = "form-control-label";

    return (
      <div className={className}>
        <label htmlFor={this.props.name} className={labelClassName}>
          <FormattedMessage id={this.props.title}/>
        </label>
        <select
          title={this.props.title}
          onChange={this.updatePrefrences}
          value={currentValue? currentValue.type : ''}
          className="form-control"
          name={this.props.name}>
          {options}
        </select>

        {propertyPrefrences}

        <span className=' validation-error'>{errorMessage}</span>
      </div>
    );
  }

});


export default PreferencesInput;
