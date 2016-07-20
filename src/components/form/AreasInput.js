import React from 'react';
import ReactFireMixin from 'reactfire';
import Formsy from 'formsy-react';
import {FormattedMessage} from 'react-intl';

//components
const AreasInput = React.createClass({
  mixins: [ReactFireMixin, Formsy.Mixin],

  propTypes: {
    location: React.PropTypes.string.isRequired,
    options: React.PropTypes.array,
    className: React.PropTypes.string,
    value: React.PropTypes.string,
    name: React.PropTypes.string,
    title: React.PropTypes.string
  },
  getInitialState: function(){
    return {
      areas: []
    }
  },

  changeValue(event) {
    if(this.props.onChange)
      this.props.onChange(event);

    this.setValue(event.currentTarget.value);
  },

  componentWillMount: function(){
    this.bindAsArray(firebase.database().ref(`areas/${this.props.location}`), 'areas');
  },
  componentWillReceiveProps: function(){

    this.unbind('areas');
    this.bindAsArray(firebase.database().ref(`areas/${this.props.location}`), 'areas');
  },
//  shouldComponentUpdate: function(nextProps, nextState) {
//    console.log(nextProps);
//    return nextProps.location !== this.props.location;
//  },
  render: function(){
    const className = (this.props.className || ' ') + " " +
      (this.showRequired() ? 'required' : this.showError() ? 'error' : '');
    const errorMessage = this.getErrorMessage();


    const options = this.state.areas.map((option, i) => (
      <option key={'areas-option-'+i} value={ option['.key']}>
        { option['.value']}
      </option>
    ));

    options.unshift(
      <option key={'areas-option-null'} value={null}>
        --- CHOOSE ---
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
          onChange={this.changeValue}
          value={this.getValue()}
          className="form-control"
          name={this.props.name}
          required>
          {options}
        </select>
        <span className='validation-error'>{errorMessage}</span>
      </div>
    );
  }

});


export default AreasInput;
