import Image from './Image';

const PropertySingleSlider = (props)=>{
  if(!props.images)
    return null;


  return (
    <div className={props.className}>

      <figure>
        <Image url={`${props.FBref}/${props.images[0]}`}/>
        <span className="label sale">{props.purpose}</span>
      </figure>
      { props.images.length > 1 ?
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
