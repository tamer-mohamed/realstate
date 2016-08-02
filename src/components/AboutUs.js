import React from 'react';
import { Link } from 'react-router';

const AboutUs = React.createClass({

  render: function(){
    return (
      <div className="page-wrap">

        <div className="container">
          <div className="page-contents">

            <div className="row">
              <div className="col-md-11 col-md-offset-1">
                <p>Simsar.com is the website for You. At simsar we are dedicated to understand the market and customer needs hence bridging the gap between both!</p>
              </div>
            </div>

            <div className="row">
              <div className="col-md-5">
                <figure>
                  <a href="#">
                    <img src="dist/images/about.png" alt="Profile Image" className="img-responsive"/>
                    <div className="overlay"></div>
                  </a>
                </figure>
              </div>
              <div className="col-md-7">
                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                  totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta
                  sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
                  consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
                  dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora
                  incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
                <p>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut
                  aliquid ex ea commodi consequatur?</p>
              </div>
            </div>

            <div className="row">
              <div className="col-md-11 col-md-offset-1">
                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                  totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta
                  sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
                  consequuntur magni.</p>
              </div>
            </div>

          </div>
        </div>

        <div className="full-width history">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h3>History of success</h3>
                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                  Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus
                  mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.</p>
                <button className="btn btn-danger">LEARN MORE</button>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="page-contents">

            <div className="row">
              <div className="col-md-11 col-md-offset-1">
                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                  totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta
                  sunt explicabo.</p>
              </div>
            </div>

            <div className="row">
              <div className="col-md-7">
                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                  totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta
                  sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
                  consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
                  dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora
                  incidunt ut labore et dolore magnam aliquam quaerat voluptatem. </p>
                <p>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut
                  aliquid ex ea commodi consequatur?</p>
              </div>
              <div className="col-md-5">
                <figure>
                  <a href="#">
                    <img src="dist/images/about2.png" alt="Profile Image" className="img-responsive"/>
                    <div className="overlay"></div>
                  </a>
                </figure>
              </div>
            </div>

            <div className="row">
              <div className="col-md-11 col-md-offset-1">
                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                  totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae
                  dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
                  fugit, sed quia consequuntur magni</p>
              </div>
            </div>

          </div>
        </div>

        <div className="full-width partners">
          <div className="container">
            <div className="row">
              <ul>
                <li className="col-md-2"><a href="#"><img src="dist/images/logo1.png" alt="Client Logo"
                                                          className="img-responsive"/></a></li>
                <li className="col-md-2"><a href="#"><img src="dist/images/logo2.png" alt="Client Logo"
                                                          className="img-responsive"/></a></li>
                <li className="col-md-2"><a href="#"><img src="dist/images/logo3.png" alt="Client Logo"
                                                          className="img-responsive"/></a></li>
                <li className="col-md-2"><a href="#"><img src="dist/images/logo4.png" alt="Client Logo"
                                                          className="img-responsive"/></a></li>
                <li className="col-md-2"><a href="#"><img src="dist/images/logo5.png" alt="Client Logo"
                                                          className="img-responsive"/></a></li>
                <li className="col-md-2"><a href="#"><img src="dist/images/logo6.png" alt="Client Logo"
                                                          className="img-responsive"/></a></li>
              </ul>
            </div>
          </div>
        </div>


        <div className="full-width rewiews">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <img src="dist/images/avatar1.png" alt="" className="img-responsive"/>
                <h6>Eva Rodriges</h6>
                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean
                  massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus...</p>
              </div>
            </div>
          </div>
        </div>


      </div>
    )
  }

});


export default AboutUs;
