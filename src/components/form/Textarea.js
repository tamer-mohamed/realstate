import React from 'react';
import Formsy from 'formsy-react';
import {FormattedMessage, injectIntl} from 'react-intl';

const Textarea = React.createClass({

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
    const {formatMessage} = this.props.intl;
    const className = (this.props.className || ' ') + " " +
      (this.showRequired() ? 'required' : this.showError() && this.isFormSubmitted() ? 'error' : '') +
      (this.props.type === 'checkbox' ? '' : '');

    // An error message is returned ONLY if the component is invalid
    // or the server has returned an error message
    const errorMessage = this.isFormSubmitted() && this.getErrorMessage();

    const input = <textarea
      type={this.props.type || 'text'}
      name={this.props.name}
      onChange={this.changeValue}
      onBlur={this.changeValue}
      placeholder={formatMessage({id:this.props.placeholder})}
      value={this.getValue()}
      checked={this.props.type === 'checkbox' && this.getValue() ? 'checked' : null}
    />;

    return (
      <div className={className}>
        {input}
        {this.props.showErrors && <span className='validation-error'>{errorMessage}</span>}
      </div>
    );
  }
});

export default injectIntl(Textarea);
