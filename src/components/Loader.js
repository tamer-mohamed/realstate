import React from 'react';
import {FormattedMessage,intlShape, injectIntl} from 'react-intl';

const Loader = React.createClass({
  propTypes: {
    intl: intlShape.isRequired,
    title: React.PropTypes.string.isRequired,
  },
  render: function(){
    const {formatMessage} = this.props.intl;
    return <div> {formatMessage({id: this.props.title})} ....... </div>
  }

});


export default injectIntl(Loader);
