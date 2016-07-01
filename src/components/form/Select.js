import React from 'react';
import Formsy from 'formsy-react';
import {FormattedMessage, FormattedNumber, FormattedRelative} from 'react-intl';


const SelectField = React.createClass({
  mixins: [Formsy.Mixin],
  propTypes: {options: React.PropTypes.array},
  changeValue(event) {
    if(this.props.onChange)
      this.props.onChange(event);

    this.setValue(event.currentTarget.value);
  },

  render() {
    const className = (this.props.className || ' ') + " " +
      (this.showRequired() ? 'required' : this.showError() ? 'error' : '');
    const errorMessage = this.getErrorMessage();

    const options = this.props.options.map((option, i) => (
      <option key={option.title+option.value} value={option.value}>
        {option.title}
      </option>
    ));

    const labelClassName = "form-control-label";

    return (
      <div className={className}>
        <label htmlFor={this.props.name} className={labelClassName}>
          <FormattedMessage id={this.props.title}/>
        </label>
        <select className="form-control" name={this.props.name} onChange={this.changeValue} value={this.getValue()}>
          {options}
        </select>
        <span className='validation-error'>{errorMessage}</span>
      </div>
    );
  }

});

export default SelectField;
