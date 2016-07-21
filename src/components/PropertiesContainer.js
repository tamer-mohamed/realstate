import React from 'react';
import _ from 'lodash';
// components
import Property from './Property';

const PropertiesContainer = React.createClass({
  propTypes: {
    data: React.PropTypes.object
  },

  // rendering data
  propertiesRender: function(){
    let properties = [];

    _.forEach(this.props.data, (v, k)=>{
      properties.push(<li className="col-md-3 col-sm-6" key={k}><Property
        data={v}/></li>)
    });
    return properties;
  },

  render: function(){
    return (
      <div className="container">
        <ul className="row">
          {this.propertiesRender()}
        </ul>
      </div>
    )
  }
});

export default PropertiesContainer;
