import React from 'react';
import Formsy from 'formsy-react';
import { If, Then, Else } from 'react-if';
import firebase from 'firebase';
import FBImage from '../Image';
import Input from './Input';
import {FormattedMessage, FormattedNumber, FormattedRelative} from 'react-intl';

const inputHidden = React.createClass({
// Add the Formsy Mixin
  mixins: [Formsy.Mixin],

  render: function(){
    return ( <input type="hidden" value={this.getValue()} name={this.props.name}/>);
  }
});


export default inputHidden;
