import React from "React";
import NProgress from 'nprogress';
import Image from './Image';

const ProfilePic = React.createClass({

  propTypes: {
    image: React.PropTypes.string,
    fbRef: React.PropTypes.string.isRequired
  },
  render: function(){
    let ref = this.props.fbRef;
    let image = this.props.image || "default";

    return (
      <Image url={`${ref}/${image}`}/>
    )
  }
});

export default ProfilePic;
