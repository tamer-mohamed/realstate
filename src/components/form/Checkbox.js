import React from 'react';
import Formsy from 'formsy-react';

import {FormattedMessage,injectIntl} from 'react-intl';

const CheckBox = React.createClass({

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
    let {formatMessage} = this.props.intl;
    const className = (this.props.className || ' ') + " checkbox " +
      (this.showRequired() ? 'required' : this.showError() ? 'error' : '');

    return (
      <div className={className}>
        <input
          type="checkbox"
          name={this.props.name}
          onChange={this.changeValue}
          value={this.getValue()}
          checked={this.getValue() ? 'checked' : null}
        />
        {formatMessage({id: this.props.title})}
      </div>
    );
  }
});

export default injectIntl(CheckBox);
