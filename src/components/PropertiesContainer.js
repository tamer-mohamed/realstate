import React from 'react';
// components
import Property from './Property';

const PropertiesContainer = React.createClass({
  propTypes: {
    data: React.PropTypes.array
  },

  // rendering data
  propertiesRender: function(){
    return this.props.data.map((property)=>{
      return (<li className="col-md-3 col-sm-6" key={property['.key']}><Property data={property}/></li>);
    });
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
