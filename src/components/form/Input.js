import React from 'react';
import Formsy from 'formsy-react';
import { If, Then, Else } from 'react-if';
import {FormattedMessage, FormattedNumber, FormattedRelative} from 'react-intl';

const InputField = React.createClass({

  // Add the Formsy Mixin
  mixins: [Formsy.Mixin],

  propTypes: {
    onChange: React.PropTypes.func
  },

  getInitialState: function(){
    return {
      value: this.props.value
    };
  },
  syncValue: function(){
    this.setValue(this.state.value);
  },

  // setValue() will set the value of the component, which in
  // turn will validate it and the rest of the form
  changeValue(event) {

    let eventType;
    switch(this.props.type){
      case "checkbox":
        eventType = "checked";
        break;
      case "file":
        eventType = "files";
        break;
      default:
        eventType = "value";
        break;

    }
    let value = event.currentTarget[eventType];

    if(this.props.onChange)
      this.props.onChange(value);

    this.setValue(value);
  },
  render() {
    // Set a specific className based on the validation
    // state of this component. showRequired() is true
    // when the value is empty and the required prop is
    // passed to the input. showError() is true when the
    // value typed is invalid
    const className = (this.props.className || ' ') + " " +
      (this.showRequired() ? 'required' : this.showError() ? 'error' : '') +
      (this.props.type === 'checkbox' ? '' : '');

    // An error message is returned ONLY if the component is invalid
    // or the server has returned an error message
    const errorMessage = this.getErrorMessage();

    const labelClassName = "form-control-label";

    const input = <input
      className={this.props.type !== 'checkbox'? "form-control" : null}
      type={this.props.type || 'text'}
      name={this.props.name}
      onChange={this.changeValue}
      onBlur={this.changeValue}
      value={this.getValue()}
      checked={this.props.type === 'checkbox' && this.getValue() ? 'checked' : null}
    />;

    return (
      <div className={className}>

        {this.props.type === "checkbox" ?
          <label> <FormattedMessage id={this.props.title}/> {input} </label>
          :
          <div>
            <label htmlFor={this.props.name} className={labelClassName}>
              <FormattedMessage id={this.props.title}/>
            </label>
            {input}
            <span className='validation-error'>{errorMessage}</span>
          </div>
        }


      </div>
    );
  }
});

export default InputField;
