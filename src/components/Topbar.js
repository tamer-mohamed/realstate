import React from 'react';
import { Link } from 'react-router';


const Topbar = React.createClass({

  render: function(){
    return (
      <div className="top-bar">
        <div className="container">
          <div className="row">
            <div className="col-md-12">

              <p className="text">
                <a><i className="fa fa-map-marker"/> Kuwait</a>
                <a href="tel:+61383766284"><i className="fa fa-phone"/> +965 6995 8669</a>
              </p>

            </div>
          </div>
        </div>

      </div>
    )
  }
});

export default Topbar;
