import React from 'react';
import { Link } from 'react-router';
import { If, Then, Else } from 'react-if';


const Property = React.createClass({
  propTypes: {
    data: React.PropTypes.object
  },
  contextTypes: {
    lang: React.PropTypes.string
  },
  renderDetails: function(){
    let data = "";

    switch(this.props.data.type){
      case 'apartement':
        data = <div>
          <span className="bed">{this.props.data.info.bedroom}</span>
          <span className="bath">{this.props.data.info.bathroom}</span>
          <span className="garage">{this.props.data.info.garage}</span>
        </div>;
        break;
    }
    return data;
  },
  render: function(){
    let lang = this.context.lang;
    let itemID = this.props.data['.key'];

    return (
      <div className="item">
        <div className="item-header clearfix">
          <h3><Link to={`/${lang}/properties/${itemID}`}>{this.props.data.title}</Link>
          </h3>
        </div>
        <figure>
          <img src="dist/images/items/10.png" alt="" className="img-responsive"/>
          <div className="overlay">
            <Link to={`/${lang}/properties/${itemID}`} className="btn btn-detail">Detail</Link>
          </div>
        </figure>

        <div className="item-detail">
          <div className="left">
              <span className="place">
                <i className="fa fa-map-marker"/>{this.props.data.area}({this.props.data.location})
              </span>

            {this.renderDetails()}

          </div>
          <div className="right">
            <span className="area">{this.props.data.space} m2</span>
            <span className="price">$ {this.props.data.price}</span>
          </div>
        </div>
      </div>
    );
  }
});

export default Property;
