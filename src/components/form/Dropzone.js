import Drop from 'react-dropzone';
import _ from 'lodash';
import React from 'react';
import InputHidden from './InputHidden';
import FileStorage from '../../models/FileStorage';
import {injectIntl,intlShape} from 'react-intl';


const Dropzone = React.createClass({
  propTypes: {
    accept: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    intl: intlShape.isRequired
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

  deleteImage: function(){
    this.setState({
      file: null
    });
  },
  render: function(){
    let {formatMessage} = this.props.intl;
    return (
      <div className={this.props.className}>

        {this.state.file ?
          <div>

            <div key={this.props.name} className="item text-center">

              <figure>
                <img src={this.state.file.preview} className="img-responsive"/>
                <div className="overlay">
                  <a onClick={this.deleteImage} className="btn btn-detail"> - </a>
                </div>

              </figure>

              <InputHidden value={this.state.file} name={`${this.props.name}`}/>
            </div>
          </div> :
          <div className={"text-center"}>
            <Drop className="dropzone-component col-md-12"
                  ref="dropzone"
                  onDrop={this.onDrop}
                  multiple={false}
                  accept={this.props.accept}>
              <div>{formatMessage({id: this.props.title})}</div>
              <div className="overlay">
                <a onClick={this.onDrop} className="btn btn-danger">+</a>
              </div>
            </Drop>
          </div>
        }
      </div>
    )
  }

});


export default injectIntl(Dropzone);
