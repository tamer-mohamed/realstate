import React from 'react';
import Formsy from 'formsy-react';
import { If, Then, Else } from 'react-if';
import firebase from 'firebase';
import {FormattedMessage, FormattedNumber, FormattedRelative} from 'react-intl';

const FileUpload = React.createClass({


  // Add the Formsy Mixin
  mixins: [Formsy.Mixin],

  propTypes: {
    onChange: React.PropTypes.func
  },

  getInitialState: function(){
    return {
      value: this.props.value
    };
  },
  syncValue: function(){
    this.setValue(this.state.value);
  },

  // setValue() will set the value of the component, which in
  // turn will validate it and the rest of the form
  changeValue(event) {

    this.upload(event.target.files, function(snapshot){
      this.setValue(name);
    });


  },
  upload(files, cb){
    let storage = firebase.storage().ref('images');
    for(var i = 0, f; f = files[i]; i++){
      let uploadTask = storage.child(f.name).put(f, {contentType: f.type});
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function(snapshot){
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      }, function(error){
        // Handle unsuccessful uploads
        alert('File upload:', error.code);
      }, function(){
      });

    }
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

    const preview = this.getValue() ? <div></div> : null;

    const input = <input
      className={className}
      type={'file'}
      name={this.props.name}
      onChange={this.changeValue}
      value={this.getValue()}
      checked={this.props.type === 'checkbox' && this.getValue() ? 'checked' : null}
    />;

    return (
      <div className={className}>
        {preview}

        {
          <div>
            {input}
            <span className='validation-error'>{errorMessage}</span>
          </div>
        }


      </div>
    );
  }

});


export default FileUpload;
