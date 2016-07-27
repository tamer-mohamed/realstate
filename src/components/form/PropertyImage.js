import React from 'react';
import Dropzone from './Dropzone';
import Image from '../Image';
import FileStorage from '../../models/FileStorage';
import {FormattedMessage,intlShape, injectIntl} from 'react-intl';

const PropertyImage = React.createClass({
  propTypes: {
    images: React.PropTypes.array,
    intl: intlShape.isRequired,
  },
  getDefaultProps: function(){
    return {
      images: []
    }
  },
  getInitialState: function(){
    return {
      images: this.props.images,
      imagesToUpload: []
    }
  },
  generateDropZones: function(){
    let {images} = this.state;
    let num = images.length > 0 ? images.length : 0;
    let zones = [];
    for(let i = num; i < this.props.maxImages; i++)
      zones.push(<Dropzone onDrop={this.onDrop} className={"col-md-3"} key={`dropzone-${i}`}
                           name={`propertyImagesToUpload[${i}]`}
                           accept="image/*"/>);

    return zones;
  },
  updateImages: function(images){
    //this.props.onUpdate(images);
    this.setState({images});
  },
  onDrop: function(file){
    console.log('ADDING', file);
    let images = this.state.imagesToUpload;

    images.push(file);
    this.setState({imagesToUpload: images});
  },
  deleteImage: function(image){
    const {formatMessage} = this.props.intl;


    console.log('DELTETE', image);

    FileStorage.delete(`images/${this.props.propId}/${image}`).then(()=>{

      let images = this.state.images;
      images = _.remove(images, function(imageName){
        return imageName === image;
      });
      firebase.database().ref(`properties/${this.props.propId}`).update(({images})).then(()=>this.updateImages(images));

    }).catch(()=>{

      this.context.pushNotification({message: formatMessage({id: "errorGeneric"}), level: 'error'});
    })
  },

  render: function(){
    let {images} = this.state;


    return (
      <div>
        <h6><FormattedMessage id="upload" values={{value:images.length}}/></h6>
        {images.map((image, i)=>{
          return <div kary={'property-image'+image+i} className="col-md-3">
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
        {this.generateDropZones()}
      </div>);
  }
});

export default injectIntl(PropertyImage);
