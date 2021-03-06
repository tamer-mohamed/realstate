import React from 'react';
import ReactFireMixin from 'reactfire';
import Formsy from 'formsy-react';
import {FormattedMessage,intlShape, injectIntl} from 'react-intl';

//components
const AreasInput = React.createClass({
  mixins: [ReactFireMixin, Formsy.Mixin],

  propTypes: {
    intl: intlShape.isRequired,
    location: React.PropTypes.string.isRequired,
    options: React.PropTypes.array,
    className: React.PropTypes.string,
    value: React.PropTypes.string,
    name: React.PropTypes.string,
    title: React.PropTypes.string
  },
  getInitialState: function(){
    return {
      areas: [],
      value: this.props.value
    }
  },

  changeValue(event) {
    if(this.props.onChange)
      this.props.onChange(event);

    let value = event.currentTarget.value === "" ? null : event.currentTarget.value;

    this.setValue(value);
  },

  componentWillMount: function(){
    this.bindAsArray(firebase.database().ref(`areas/${this.props.location}`), 'areas');
  },
  componentWillReceiveProps: function(nextProps){
    this.unbind('areas');
    this.bindAsArray(firebase.database().ref(`areas/${nextProps.location}`), 'areas');
  },
//  shouldComponentUpdate: function(nextProps, nextState){
//    console.log(nextProps.location !== this.props.location || this.state.areas !== nextState.areas);
//    return nextProps.location !== this.props.location || this.state.areas !== nextState.areas;
//  },
  render: function(){
    const {formatMessage} = this.props.intl;
    const className = (this.props.className || ' ') +
      (this.showRequired() ? 'required' : !this.isPristine() && this.showError() ? ' error' : '');
    const errorMessage = !this.isPristine() || this.isFormSubmitted() ? this.getErrorMessage() : null;

    const options = this.state.areas.map((option, i) => (
      <option key={'areas-option-'+i} value={ option['.key']}>
        {formatMessage({id: `areas.${option['.key']}`})}
      </option>
    ));

    options.unshift(
      <option key={'areas-option-null'} value={""}>
        {formatMessage({id: "forms.generic.select"})}
      </option>
    );

    const labelClassName = "form-control-label";

    return (
      <div className={className}>
        <label htmlFor={this.props.name} className={labelClassName}>
          <FormattedMessage id={this.props.title}/>
        </label>
        <select
          {...this.props}
          title={this.props.title}
          onChange={this.changeValue}
          value={this.getValue()}
          className="form-control"
          name={this.props.name}>
          {options}
        </select>
        <span className='validation-error'>{errorMessage}</span>
      </div>
    );
  }

});


export default injectIntl(AreasInput);
