import React from 'react';
import ReactFireMixin from 'reactfire';
import Formsy from 'formsy-react';
import {FormattedMessage,intlShape, injectIntl} from 'react-intl';
import RadioGroup from './RadioGroup';
import Loader from '../Loader';

const AccountTypes = React.createClass({

  propTypes: {
    intl: intlShape.isRequired,
    onChange: React.PropTypes.func,
    onLoaded: React.PropTypes.func,
    title: React.PropTypes.string,
    editMode: React.PropTypes.bool
  },
  getInitialState: function(){
    return {
      loaded: false
    }

  },
  componentWillMount: function(){
    firebase.database().ref('config/accountTypes').once('value', (snapshot)=>{
      let value = snapshot.val();
      let types = [];

      _.forEach(value, function(v, k){
        types.push({value: k, title: v});
      });

      this.setState({loaded: true, types});
    });

  },

  render: function(){
    if(!this.state.loaded)
      return <Loader title="loading"/>;

    let types = this.state.types;
    return (<RadioGroup items={types}
                        name="userType"/>);
  }

});


export default injectIntl(AccountTypes);
