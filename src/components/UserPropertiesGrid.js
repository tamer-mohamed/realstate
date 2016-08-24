import Loader from './Loader';
import React from 'react';
import Property from './Property';

const UserPropertiesGrid = React.createClass({
  getInitialState: function(){
    return {
      loaded: false
    }
  },
  getDefaultProps: function(){
    return {
      length: 5
    }
  },
  componentWillMount: function(){
    const {id,userId,length} = this.props;
    firebase.database().ref(`properties`).orderByChild('addedBy').equalTo(userId).limitToFirst(length).once('value', (snapShot)=>{
      let properties = snapShot.val();
      // delete the current property
      if(properties)
        delete properties[id];

      this.setState({loaded: true, properties});
    });
  },
  render: function(){
    if(!this.state.loaded){
      return <Loader title="loading"/>;
    }

    let properties = [];
    _.forEach(this.state.properties, (v, k)=>{
      properties.push(<li className="col-md-3 col-sm-6" key={k}>
        <Property data={v} id={k}/></li>);
    });

    return (
      <div className="properties-page property-single">
        <ul className="row">{properties}</ul>
      </div>
    )
  }
});

export default UserPropertiesGrid;
