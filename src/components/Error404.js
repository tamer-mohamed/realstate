import React from 'react';
import { Link } from 'react-router';


const Error404 = React.createClass({
  contextTypes: {
    lang: React.PropTypes.string
  },

  render: function(){
    return (
      <div className="page-wrap error-page">

        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h4>404</h4>
              <h6>Error</h6>
              <p>Page Not Found</p>
              <Link className="btn btn-danger" to={this.context.lang}>Back to Home</Link>
            </div>
          </div>
        </div>

      </div>
    );
  }

});

export default Error404;
