import React from 'react';
import Formsy from 'formsy-react';
import { If, Then, Else } from 'react-if';
import {FormattedMessage, FormattedNumber, FormattedRelative} from 'react-intl';

const InputField = React.createClass({

  // Add the Formsy Mixin
  mixins: [Formsy.Mixin],

  getInitialState: function () {
    return {
      value: this.props.value
    };
  },

  syncValue: function () {
    this.setValue(this.state.value);
  },

  // setValue() will set the value of the component, which in
  // turn will validate it and the rest of the form
  changeValue(event) {
    this.setValue(event.currentTarget[this.props.type === 'checkbox' ? 'checked' : 'value']);
  },
  render() {
    // Set a specific className based on the validation
    // state of this component. showRequired() is true
    // when the value is empty and the required prop is
    // passed to the input. showError() is true when the
    // value typed is invalid
    const className = (this.props.className || ' ') + " " +
      (this.showRequired() ? 'required' : this.showError() ? 'error' : '');

    // An error message is returned ONLY if the component is invalid
    // or the server has returned an error message
    const errorMessage = this.getErrorMessage();

    const labelClassName = "form-control-label";

    return (
      <div className={className}>
        <label htmlFor={this.props.name} className={labelClassName}>
          <FormattedMessage id={this.props.title}/>
        </label>
        <div className="input-group">
          <div className="input-group-addon">{this.props.addOnLabel}</div>
          <input
            className="form-control"
            type={this.props.type || 'text'}
            name={this.props.name}
            onChange={this.changeValue}
            onBlur={this.syncValue}
            value={this.getValue()}
            checked={this.props.type === 'checkbox' && this.getValue() ? 'checked' : null}
          />
        </div>


        <span className='validation-error'>{errorMessage}</span>
      </div>
    );
  }
});

export default InputField;
