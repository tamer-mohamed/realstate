import React from 'react';
import Formsy from 'formsy-react';
import { If, Then, Else } from 'react-if';
import firebase from 'firebase';
import FBImage from '../Image';
import InputHidden from './InputHidden';
import {FormattedMessage, FormattedNumber, FormattedRelative} from 'react-intl';

const FileUpload = React.createClass({


  // Add the Formsy Mixin
  mixins: [Formsy.Mixin],

  propTypes: {
    firebaseRef: React.PropTypes.string.isRequired
  },
  getDefaultProps: function(){
    return {
      fileName: ""
    }
  },

  getInitialState: function(){
    return {
      imageName: this.props.imageName,
      uploading: false
    };
  },

  // setValue() will set the value of the component, which in
  // turn will validate it and the rest of the form
  changeValue(event) {

    this.upload(event.target, (file)=>{
      this.setState({uploading: false, files:event.target.files});
    });


  },
  render() {
    // Set a specific className based on the validation
    // state of this component. showRequired() is true
    // when the value is empty and the required prop is
    // passed to the input. showError() is true when the
    // value typed is invalid
    const className = (this.props.className || ' ') + " " +
      (this.showRequired() ? 'required' : this.showError() ? 'error' : '') +
      (this.props.type === 'checkbox' ? '' : '');

    // An error message is returned ONLY if the component is invalid
    // or the server has returned an error message
    const errorMessage = this.getErrorMessage();

    const isUploading = this.state.uploading;


    const preview = this.state.imageName !== '' ?
      <FBImage url={this.props.firebaseRef+'/'+this.state.imageName}/> : null;

    const input = <input
      ref='fileInput'
      className={className}
      type={'file'}
      onChange={this.changeValue}
    />;

    return (
      <div className="row">
        <div className="col-md-3">
          {preview}
        </div>
        <div className="col-md-4">
          {isUploading ? <FormattedMessage id="uploading"/> :
            <div>
              <InputHidden name={this.props.name} value={this.state.imageName || null}/>
              <div>
                {input}
                <span className='validation-error'>{errorMessage}</span>
              </div>
            </div>
          }
        </div>
      </div>
    );
  }

});


export default FileUpload;
