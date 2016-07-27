import Drop from 'react-dropzone';
import _ from 'lodash';
import React from 'react';
import InputHidden from './InputHidden';


const Dropzone = React.createClass({
  propTypes: {
    accept: React.PropTypes.string.isRequired
  },
  getInitialState: function(){
    return {}
  },
  onDrop: function(files){

    if(this.props.onDrop){
      this.props.onDrop(files[0]);
    }
    this.setState({
      file: files[0]
    });
  },
  render: function(){
    return (
      <div className={this.props.className}>

        {this.state.file ? <div>

          <div key={this.props.name}>
            <img src={this.state.file.preview} className="img-responsive"/>
            <InputHidden value={this.state.file} name={`${this.props.name}`}/>
          </div>
        </div> :
          <Drop ref="dropzone" onDrop={this.onDrop} multiple={false} accept={this.props.accept}>
            <div>Try dropping some files here, or click to select files to upload.</div>
          </Drop>
        }
      </div>
    )
  }

});


export default Dropzone;
