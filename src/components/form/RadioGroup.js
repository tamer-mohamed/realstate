import React from 'react';
import Formsy from 'formsy-react';
import {FormattedMessage} from 'react-intl';

const RadioGroup = React.createClass({
  mixins: [Formsy.Mixin],

  getInitialState: function(){
    return {
      value: this.props.value || null
    }
  },

  componentDidMount() {
    const value = this.props.value;
    this.setValue(value);
    this.setState({value});
  },

  changeValue(value) {
    this.setValue(value);
    this.setState({value});
  },

  render() {
    const className = 'form-group' + (this.props.className || ' ') +
      (this.showRequired() ? 'required' : this.showError() ? 'error' : '');
    const errorMessage = this.getErrorMessage();

    const { name, items } = this.props;
    return (

      <div className={className}>
        {items.map((item, i) => (
          <div key={i}>
            <input
              type="radio"
              name={name}
              onChange={this.changeValue.bind(this, item['.key'])}
              checked={this.state.value === item['.key']}
            />
            <span><FormattedMessage id={`${item['.value']}`}/></span>
          </div>
        ))
        }
        <span className='validation-error'>{errorMessage}</span>
      </div>
    );
  }

});

export default RadioGroup;
