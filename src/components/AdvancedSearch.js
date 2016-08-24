import React from 'react';
import {injectIntl} from 'react-intl';
import {Form} from 'formsy-react';
import Firebase from 'firebase';
import Progress from 'nprogress';
import Select from 'react-select';
import Loader from './Loader';
import Location from './form/filters/Location';
import Type from './form/filters/Type';
import Purpose from './form/filters/Purpose';
import Price from './form/filters/Price';
import Area from './form/filters/Area';
import Pagination from './Pagination';


const advancedSearch = React.createClass({
  getInitialState: function(){
    return {
      page: 1,
      itemsPerPage: 10
    }
  },
  fetchData: function({start,end}){
    Progress.start();
    Firebase.database().ref('properties').orderByKey().equalTo(end).once('value', snapshot=>{
      Progress.done();
      this.setState({loaded: true, data: snapshot.val()})
    })
  },
  componentWillMount: function(){
    const {itemsPerPage , page} = this.state;
    this.fetchData({start: page - 1, end: itemsPerPage - 1});
  },
  filterResults: function(){

  },
  render: function(){
    const {formatMessage} = this.props.intl;
    const {loaded}= this.state;

    if(!loaded)
      return <Loader title="loading"/>;

    console.log('DATAAA ', this.state.data);

    return (

      <div className="page-wrap properties-page">

        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="page-title">{formatMessage({id: "advancedSearch.pageTitle"})}</h2>
            </div>
          </div>
        </div>


        <div className="container">
          <div className="row">
            <aside className="col-md-4">

              <div className="property-search">
                <Form preventExternalValidation onsubmit={this.filterResults}>


                  <Location />

                  <Type />

                  <Purpose />

                  <hr/>

                  <Area min={0} max={100} defaultValue={[0,50]} range={true}/>

                  <Price min={0} max={100} defaultValue={[0,50]} range={true}/>


                  <div className="buttons">
                    <button className="btn btn-danger"><i className="fa fa-search"/>Search</button>
                    <button className="btn btn-clear">Clear</button>
                  </div>

                </Form>
              </div>

            </aside>

            <div className="col-md-8">

              <div className="row properties-list">

                <div className="col-md-12">
                  <div className="item">
                    <figure>
                      <img src="images/items/1.png" alt="" className="img-responsive"/>
                      <span className="label sale">Sell</span>
                      <div className="overlay">
                        <a href="#" className="btn btn-detail">Detail</a>
                      </div>
                    </figure>
                    <div className="item-data">
                      <div className="item-header clearfix">
                        <h3><a href="#">Los Angles Apartment</a></h3>
                        <span className="favorite"><i className="fa fa-heart"/>9</span>
                        <span className="place"><i className="fa fa-map-marker"/>Galtur (Austria)</span>
                      </div>
                      <div className="item-detail">
                        <span className="price">$ 870000</span>
                        <div className="left">
                          <span className="bed">3</span>
                          <span className="bath">2</span>
                          <span className="garage">2</span>
                          <span className="gym">1</span>
                        </div>
                        <div className="right">
                          <span className="area">134 m2</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
});


export default injectIntl(advancedSearch);
