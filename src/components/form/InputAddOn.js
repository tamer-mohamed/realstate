import React from 'react';
import Formsy from 'formsy-react';
import { If, Then, Else } from 'react-if';
import {FormattedMessage, injectIntl} from 'react-intl';

const InputFieldAddOn = React.createClass({

  // Add the Formsy Mixin
  mixins: [Formsy.Mixin],

  propTypes: {
    name: React.PropTypes.string.isRequired
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
    let className = (this.props.className || ' ');
    className += (!this.isPristine() && !this.isValid() && this.isFormSubmitted() ? 'error' : '');
    const errorMessage = !this.isPristine() && this.getErrorMessage();
    const {formatMessage} = this.props.intl;

    return (
      <div className={className}>
        <div className="input-group">
          <div className="input-group-addon">{this.props.addOnLabel}</div>
          <input
            type={this.props.type || 'text'}
            name={this.props.name}
            onChange={this.changeValue}
            value={this.getValue()}
            placeholder={this.props.placeholder? formatMessage({id:this.props.placeholder}) : null}
            checked={this.props.type === 'checkbox' && this.getValue() ? 'checked' : null}
          />
        </div>


        <span className='validation-error'>{errorMessage}</span>
      </div>
    );
  }
});

export default injectIntl(InputFieldAddOn);
