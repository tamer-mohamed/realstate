import React from 'react';
import Formsy from 'formsy-react';
import { If, Then, Else } from 'react-if';
import firebase from 'firebase';
import {FormattedMessage, FormattedNumber, FormattedRelative} from 'react-intl';
import Loader from './Loader';

const Image = React.createClass({
    getInitialState: function(){
      return {
        imageName: this.props.imageName,
        imageUrl: "",
        downloading: true
      };
    },
    componentWillMount: function(){
      firebase.storage().ref(this.props.url).getDownloadURL().then((url)=>{
        this.setState({downloading: false, imageUrl: url});
      })
    },
    render: function(){
      if(this.state.downloading)
        return <Loader />;

      return (<img src={this.state.imageUrl} className={"img-responsive"}/>);
    }

  });


export default Image;
