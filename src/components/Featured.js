import React from 'react';
import Slider from 'react-slick';

var FeaturedSlider = React.createClass({

  contextTypes: {
    lang: React.PropTypes.string
  },

  render: function(){
    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      centerMode: true,
      rtl: this.context.lang === 'ar',
      autoplay: true,
    };
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">

            <div className="flexslider" id="slider">
              <Slider {...settings}>

                <div>
                  <div className="detail">

                    <div className="white">
                      <h2>House with Ghosts</h2>
                      <span className="slide-location">South Beach, Miami (USA)</span>
                      <div className="bar"></div>
                      <span className="slide-price">$ 1 525 000</span>
                    </div>
                    <div className="red">
                      <span className="bath">3 Bathroom</span>
                      <span className="bed">2 Bedrooms</span>
                      <span className="gym">1 Gym</span>
                      <span className="pool">2 Pool</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="detail">

                    <div className="white">
                      <h2>House with Ghosts</h2>
                      <span className="slide-location">South Beach, Miami (USA)</span>
                      <div className="bar"></div>
                      <span className="slide-price">$ 1 525 000</span>
                    </div>
                    <div className="red">
                      <span className="bath">3 Bathroom</span>
                      <span className="bed">2 Bedrooms</span>
                      <span className="gym">1 Gym</span>
                      <span className="pool">2 Pool</span>
                    </div>
                  </div>
                </div>


              </Slider>

            </div>

          </div>
        </div>
      </div>

    );
  }
});

export default FeaturedSlider;
