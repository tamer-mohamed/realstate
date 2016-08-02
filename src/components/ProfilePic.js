import React from "React";
import NProgress from 'nprogress';
import Image from './Image';

const ProfilePic = React.createClass({
  defaultImg: 'default.png',
  propTypes: {
    image: React.PropTypes.string,
    userId: React.PropTypes.string.isRequired
  },
  render: function(){
    let ref = `users/`;
    let image = this.props.image ? `${this.props.userId}` : this.defaultImg;

    return (
      <Image url={`${ref}/${image}`}/>
    )
  }
});

export default ProfilePic;
