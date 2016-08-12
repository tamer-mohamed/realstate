import React from 'react';
import Formsy from 'formsy-react';
import { If, Then, Else } from 'react-if';
import {FormattedMessage, FormattedNumber, FormattedRelative} from 'react-intl';

const InputFieldPostFix = React.createClass({

  // Add the Formsy Mixin
  mixins: [Formsy.Mixin],

  propTypes: {
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string,
    disabled: React.PropTypes.bool
  },
  getInitialState: function(){
    return {
      value: this.props.value
    };
  },
  changeValue: function(e){
    let value = e.currentTarget.value == '' ? null : e.currentTarget.value;
    this.setValue(value);
  },
  render() {
    const className = (this.props.className || ' ') + " " +
      (this.showRequired() ? 'required' : this.showError() && this.isFormSubmitted() ? 'error' : '');
    const errorMessage = this.isFormSubmitted() ? this.getErrorMessage() : null;

    const labelClassName = "form-control-label";

    return (
      <div className={className}>

        <label htmlFor={this.props.name} className={labelClassName}>
          <FormattedMessage id={this.props.title}/>
        </label>

        <div className="input-group">
          <input className="form-control"
                 type={this.props.type || 'text'}
                 name={this.props.name}
                 onChange={this.changeValue}
                 value={this.getValue()}
                 checked={this.props.type === 'checkbox' && this.getValue() ? 'checked' : null}
          />

          <div className="input-group-addon">{this.props.addOnLabel}</div>
        </div>


        <span className='validation-error'>{errorMessage}</span>
      </div>
    );
  }
});

export default InputFieldPostFix;
