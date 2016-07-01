import React from 'react';
import { If, Then, Else } from 'react-if';

const ItemDetails = React.createClass({
  propTypes: {
    itemData: React.PropTypes.object
  },
  getInitialState: function(){
    return {
      itemData: this.props.itemData
    }
  },
  render: function(){
    console.log('TYPE', this.state.itemData);
    return (
      <div className="item-detail">
        <div className="left">
              <span className="place">
                <i className="fa fa-map-marker"/>{this.props.itemData.area}({this.props.itemData.location})
              </span>

          <If condition={this.props.itemData.type === 'apartement'}>
            <Then>
              <span className="bed">{this.props.itemData.info.bedroom}</span>
              <span className="bath">{this.props.itemData.info.bathroom}</span>
              <span className="garage">{this.props.itemData.info.garage}</span>
            </Then>
          </If>

        </div>
        <div className="right">
          <span className="area">{this.props.itemData.space} m2</span>
          <span className="price">$ {this.props.itemData.price}</span>
        </div>
      </div>
    )
  }
});


export default ItemDetails;
