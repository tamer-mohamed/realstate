import React from 'react';
import Dropzone from './Dropzone';
import Image from '../Image';
import FileStorage from '../../models/FileStorage';
import InputHidden from './InputHidden';
import {FormattedMessage,intlShape, injectIntl} from 'react-intl';

const PropertyImage = React.createClass({
  propTypes: {
    images: React.PropTypes.array,
    intl: intlShape.isRequired,
  },
  contextTypes: {
    pushNotification: React.PropTypes.func
  },
  getDefaultProps: function(){
    return {
      images: []
    }
  },
  getInitialState: function(){
    return {
      images: this.props.images,
      imagesToUpload: [],
      imagesToDelete: []
    }
  },
  generateDropZones: function(){
    let {images} = this.state;
    let num = images.length > 0 ? images.length : 0;
    let zones = [];
    for(let i = num; i < this.props.maxImages; i++)
      zones.push(<Dropzone key={`propertyImage-${i}`} onDrop={this.onDrop} className={"col-md-3"} key={`dropzone-${i}`}
                           title="forms.property.add.labels.image"
                           name={`propertyImagesToUpload[${i}]`}
                           accept="image/*"/>);

    return zones;
  },
  onDrop: function(file){
    let images = this.state.imagesToUpload;

    images.push(file);
    this.setState({imagesToUpload: images});
  },
  deleteImage: function(image){
    let {imagesToDelete, images} = this.state;
    //remove from the listed images
    let filtered = _.filter(images, (i)=> i !== image);

    imagesToDelete.push(image);

    this.setState({imagesToDelete, images: filtered});
  },

  render: function(){
    let {images} = this.state;


    return (
      <div>
        <h6><FormattedMessage id="upload" values={{value:images.length}}/></h6>
        {images.map((image, i)=>{
          return <div key={'property-image'+image+i} className="col-md-3">
            <div className="item">
              <figure>
                <Image url={`images/${this.props.propId}/${image}`}/>
                <div className="overlay">
                  <a onClick={()=> this.deleteImage(image)} className="btn btn-detail"> - </a>
                </div>
              </figure>
            </div>
          </div>;
        })}

        {this.state.imagesToDelete.map((image, i)=>{
          return <InputHidden value={image} name={`propertyImagesToDelete[${i}]`}/>
        })}

        {this.generateDropZones()}
      </div>);
  }
});

export default injectIntl(PropertyImage);
