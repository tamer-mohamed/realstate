import React from 'react';
import { Link } from 'react-router';


const Properties = React.createClass({
  render: function(){
    return (
      <div className="property-single">
        <div className="col-md-7 property-slider">
          <figure>
            <img src="dist/images/pro-big.jpg" alt="Image" className="img-responsive"/>
            <span className="label sale">Sale</span>
          </figure>
          <div className="thumbnails">
            <a href="#"><img src="dist/images/pro-thumb1.jpg" alt="Thumbnils" className="img-responsive"/></a>
            <a href="#"><img src="dist/images/pro-thumb2.jpg" alt="Thumbnils" className="img-responsive"/></a>
            <a href="#"><img src="dist/images/pro-thumb3.jpg" alt="Thumbnils" className="img-responsive"/></a>
          </div>
        </div>
        <div className="col-md-5 property-data">
          <div className="prop-features prop-before">
            <span className="location">Barcelona (Spain)</span>
            <span className="area">1750 Sq Ft</span>
          </div>
          <div className="prop-price">
            <strong className="price">$ 23 525 800</strong>
            <a href="" className="btn btn-danger">Contact Agent</a>
          </div>
          <div className="prop-features">
            <span className="bed">3 Bedroom</span>
            <span className="garage">1 Garage</span>
            <span className="bath">2 Baths</span>
            <span className="kitchen">2 Kithen</span>
            <span className="gym">1 Gym</span>
          </div>
          <ul>
            <li>Garden</li>
            <li>Air Condition</li>
            <li>CCTV</li>
            <li>Security System</li>
            <li>Parking</li>
            <li>Children Play Ground</li>
            <li>Graveyard</li>
            <li>Gym</li>
            <li>Community Center</li>
          </ul>
        </div>
      </div>

    );
  }
});

export default Properties;
