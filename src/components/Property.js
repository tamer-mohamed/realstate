import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import Image from './Image';
import {FormattedMessage,intlShape,injectIntl,FormattedHTMLMessage} from 'react-intl';
import { If, Then, Else } from 'react-if';


const Property = React.createClass({
  propTypes: {
    data: React.PropTypes.object,
    intl: intlShape.isRequired,
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
    let itemID = this.props.id;
    let property = this.props.data;
    let images = this.props.data.images;
    let currency = this.props.intl.formatMessage({id: "settings.currency"});
    let spaceMeasure = this.props.intl.formatHTMLMessage({id: "settings.space"});
    let purposeLabel = property.purpose === 'sell' ? 'sale' : 'rent';

    return (
      <div className="item">
        <div className="item-header clearfix">
          <h3><Link to={`/${lang}/properties/${itemID}`}>{this.props.data.title}</Link>
          </h3>
        </div>
        <figure>
          {_.isArray(images) ?
            <Image url={`images/${itemID}/${images[0]}`} alt="" className="img-responsive"/> :
            <img src="dist/images/items/10.png" alt="" className="img-responsive"/>
          }

          <span className={"label " + purposeLabel}>
            <FormattedMessage id={this.props.data.purpose}/>
          </span>

          <div className="overlay">
            <Link to={`/${lang}/properties/${itemID}`} className="btn btn-detail">Detail</Link>
          </div>
        </figure>

        <div className="item-detail">
          <div className="left">
              <span className="place">
                <i className="fa fa-map-marker"/>{this.props.data.location}
              </span>

            {this.renderDetails()}

          </div>
          <div className="right">
<<<<<<< HEAD
            <span className="area">{this.props.data.space} m<sub>2</sub></span>
            <span className="price">KD {this.props.data.price}</span>
=======
            <span className="area"> <FormattedHTMLMessage id="property.space"
                                                          values={{space:this.props.data.space,measure:spaceMeasure}}/> <sup>2</sup></span>
            <span className="price"><FormattedMessage id="property.price"
                                                      values={{currency,price:this.props.data.price}}/> </span>
>>>>>>> origin/dev
          </div>
        </div>
      </div>
    );
  }
});

export default injectIntl(Property);
