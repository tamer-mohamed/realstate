import React from 'react';

const Contact = React.createClass({

  styles: {
    map: {
      width: "100%",
      height: "625px"
    }
  },

  render: function(){
    return (
      <div className="full-width map-wrap">

        <div id="map-canvas" style={this.styles.map}/>

        <div className="contact-form-wrap">
          <div className="container">
            <div className="row">
              <div className="col-md-4 col-sm-6 col-md-offset-8 col-sm-offset-6">
                <div className="contact-form">
                  <h3>Feedback</h3>
                  <form action="#">
                    <input type="text" placeholder="Name"/>
                    <input type="text" placeholder="E-Mail"/>
                    <input type="text" placeholder="Phone"/>
                    <input type="text" placeholder="Subject"/>
                    <textarea placeholder="Message"/>
                    <input type="submit" className="btn btn-danger" value="Send Message"/>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }

});

export default Contact;
