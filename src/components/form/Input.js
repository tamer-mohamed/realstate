import React from 'react';
import Formsy from 'formsy-react';

import {FormattedMessage,injectIntl} from 'react-intl';

const InputField = React.createClass({

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
    const {formatMessage} = this.props.intl;
    let className = (this.props.className || ' ') + " form-group ";
    className += (!this.isPristine() && !this.isValid() && this.isFormSubmitted() ? 'error' : '');
    const errorMessage =  this.isFormSubmitted() ? this.getErrorMessage() : null;

    const input = <input
      {...this.props}
      type={this.props.type || 'text'}
      name={this.props.name}
      placeholder={this.props.placeholder? formatMessage({id:this.props.placeholder}) : null}
      onChange={this.changeValue}
      value={this.getValue()}
    />;

    return (
      <div className={className}>
        {input}
        {this.props.showErrors && <span className='validation-error'>{errorMessage}</span>}
      </div>
    );
  }
});

export default injectIntl(InputField);
