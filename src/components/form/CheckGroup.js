import React from 'react';
import Formsy from 'formsy-react';
import CheckBox from './CheckBox';
import {FormattedMessage} from 'react-intl';

const RadioGroup = React.createClass({
  mixins: [Formsy.Mixin],

  getInitialState: function(){
    return {
      values: {}
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
  updateList: function(key, value){
    let values = this.state.values;
    values[key] = value;

    if(this.props.onChange)
      this.props.onChange(values);

    this.setState({values});
  },
  render() {
    const className = 'form-group ' + (this.props.className || ' ') +
      (this.showRequired() ? 'required' : this.showError() ? 'error' : '');
    const errorMessage = this.getErrorMessage();

    const { name, items } = this.props;
    return (

      <div className={className}>
        {items.map((item, i) => (
          <CheckBox
            key={i}
            type="checkbox"
            title={`featuredLevel.${item['.key']}`}
            name={name}
            onChange={(value)=> this.updateList(item['.key'],value)}
            checked={this.state.value === item['.key']}
          />
        ))
        }
      </div>
    );
  }

});

export default RadioGroup;
