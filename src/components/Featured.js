const FeaturedSlider = ()=>{
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">

          <div className="flexslider" id="slider">
            <ul className="slides">
              <li>
                <img src="dist/images/slider.jpg" className="img-responsive" alt="Slider Image"/>
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
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
                  </div>
                </div>
              </li>
              <li>
                <img src="dist/images/slider.jpg" className="img-responsive" alt="Slider Image"/>
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
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
                  </div>
                </div>
              </li>
            </ul>
          </div>
          
        </div>
      </div>
    </div>
  )
};

export default FeaturedSlider;
