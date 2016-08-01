import React from 'react';
import Dropzone from './Dropzone';
import Image from '../Image';
import FileStorage from '../../models/FileStorage';
import InputHidden from './InputHidden';

import {FormattedMessage,intlShape, injectIntl} from 'react-intl';

const imageDropZone = React.createClass({
  propTypes: {
    user: React.PropTypes.object,
    name: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired
  },
  getDefaultProps: function(){
    return {
      itemClassName: "col-md-3"
    }
  },
  getInitialState: function(){
    return {
      image: this.props.image || null,
      dropzone: typeof this.props.image === 'undefined'
    }
  },
  deleteImage: function(){
    this.setState({image: null, dropzone: true})
  },
  render: function(){
    return (
      this.state.dropzone ?
        <Dropzone onDrop={(image)=> this.setState({image})} className={this.props.itemClassName}
                  title={this.props.title} name={this.props.name} accept="image/*"/>
        :
        <div className={this.props.itemClassName}>
          <div className="item">
            <figure>
              <Image url={`${this.props.picRef}/${this.state.image}`}/>
              <InputHidden value={this.state.image} name={`${this.props.name}`}/>
              <div className="overlay">
                <a onClick={()=> this.deleteImage()} className="btn btn-detail"> - </a>
              </div>
            </figure>
          </div>
        </div>

    )
  }

});


export default injectIntl(imageDropZone);
