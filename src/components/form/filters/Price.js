import Slider from 'rc-slider';
import {injectIntl} from 'react-intl';
import React from 'react';

const Price = React.createClass({

  render: function(){
    const {formatMessage} = this.props.intl;
    const {min , max ,defaultValue ,range} = this.props;

    return (
      <div className="form-group">
        <label>{ formatMessage({id: "filters.priceField"}) }</label>
        <Slider
          min={min}
          range={range}
          defaultValue={defaultValue}
          max={max}
        />
      </div>
    )
  }

});


export default injectIntl(Price);
