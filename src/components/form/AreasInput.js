import React from 'react';
import ReactFireMixin from 'reactfire';
import SelectField from '../form/Select';

//components
const AreasInput = React.createClass({
  mixins: [ReactFireMixin],

  propTypes: {
    location: React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    value: React.PropTypes.string,
    name: React.PropTypes.string,
    title: React.PropTypes.string
  },
  getInitialState: function(){
    return {
      areas: []
    }
  },
  componentWillMount: function(){
    this.bindAsArray(firebase.database().ref(`areas/${this.props.location}`), 'areas');
  },
  componentWillReceiveProps: function(){

    this.unbind('areas');
    this.bindAsArray(firebase.database().ref(`areas/${this.props.location}`), 'areas');
  },
  componentWillUnmount: function(){
    this.unbind('areas');
  },
//  shouldComponentUpdate: function(nextProps, nextState) {
//    console.log(nextProps);
//    return nextProps.location !== this.props.location;
//  },
  render: function(){

    const areaOptions = this.state.areas.map((p)=>{
      return {value: p['.key'], title: p['.value']}
    });

    console.log('=OPTIONS==', this.state.areas);
    return (
      <SelectField
        title={this.props.title}
        className={this.props.className}
        name={this.props.name}
        options={areaOptions}
      />
    );
  }

});


export default AreasInput;
