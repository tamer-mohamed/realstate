import React from 'react';
import ReactFireMixin from 'reactfire';
import _ from 'lodash';
import {FormattedMessage,intlShape, injectIntl} from 'react-intl';
import SelectField from './Select';
import Loader from '../Loader';

const Purposes = React.createClass({
  propTypes: {
    intl: intlShape.isRequired,
    title: React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    value: React.PropTypes.string,
    editMode: React.PropTypes.bool
  },
  getInitialState: function(){
    return {
      loaded: false
    }

  },
  componentWillMount: function(){
    firebase.database().ref('purposes').once('value', (snapshot)=>{
      let value = snapshot.val();
      let purposes = [];

      _.forEach(value, function(v, k){
        purposes.push({value: k, title: v});
      });

      this.setState({loaded: true, purposes});
    });

  },
  render: function(){
    let {purposes} = this.state;

    if(!this.state.loaded)
      return <Loader title="loading"/>;

    let selected = this.props.editMode ? this.props.value : this.state.purposes[0];
    let className = this.props.className || "";
    return (<SelectField title={this.props.title}
                         className={className}
                         name="purpose"
                         options={purposes}
                         value={selected}/>);
  }
});


export default injectIntl(Purposes);
