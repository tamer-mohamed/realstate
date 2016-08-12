import Image from './Image';
import _ from 'lodash';

const PropertySingleSlider = (props)=>{
  let images = props.images || [];
  return (
    <div className={props.className}>

      <figure>
        {images.length > 0 ?
          <Image url={`${props.FBref}/${images[0]}`}/>
          :
          <img src="dist/images/items/10.png"/>
        }
        <span className={`label ${props.purposeId}`}>{props.purposeText}</span>
      </figure>
      { images.length > 1 ?
        <div className="thumbnails">
          {
            props.images.map((image, i)=>{
              if(i != 0)
                return (<a href="#"><Image url={`${props.FBref}/${image}`}/></a>)
            })
          }

        </div> : null
      }


    </div>
  )
};


export default PropertySingleSlider;
