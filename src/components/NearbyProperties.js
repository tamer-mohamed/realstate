import Loader from './Loader';
import React from 'react';
import Property from './Property';

const NearbyProperties = React.createClass({
  getInitialState: function(){
    return {
      loaded: false
    }
  },
  componentWillMount: function(){
    const {id,area} = this.props;
    firebase.database().ref(`properties`).orderByChild('area').equalTo(area).limitToFirst(5).once('value', (snapShot)=>{
      let properties = snapShot.val();
      // delete the current property
      delete properties[id];
      this.setState({loaded: true, properties});
    });
  },
  render: function(){
    if(!this.state.loaded){
      return <Loader title="loading"/>;
    }

    console.log(this.state.properties);
    let properties = [];
    _.forEach(this.state.properties, (v, k)=>{
      properties.push(<li className="col-md-3 col-sm-6" key={k}>
        <Property data={v} id={k}/></li>);
    });

    return (
      <ul className="row">{properties}</ul>
    )
  }
});

export default NearbyProperties;
