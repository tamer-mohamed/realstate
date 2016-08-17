import React from 'react';
import ReactFireMixin from 'reactfire';
import Firebase from 'firebase';
import {Link} from 'react-router';
import NProgress from "nprogress";
import Loader from '../Loader';
import _ from 'lodash';
import {FormattedMessage,intlShape, injectIntl} from 'react-intl';
import FeatureLevelsModal from '../form/FeatureLevelsModal';

//components
const MyProperties = React.createClass({
  mixins: [ReactFireMixin],
  contextTypes: {
    user: React.PropTypes.object,
    lang: React.PropTypes.string
  },
  getInitialState: function(){
    return {
      loaded: false,
      properties: []
    }
  },
  componentWillMount: function(){
    NProgress.start();
    let ref = Firebase.database().ref("properties");
    ref.orderByChild("addedBy").equalTo(this.context.user.uid).once('value', (snapshot)=>{
      let value = snapshot.val();
      NProgress.done();
      this.setState({loaded: true, properties: value});
    });
  },
  handleDeleteProperty: function(e, propertyId){
    e.preventDefault();


    let confirm = window.confirm('are you sure?');
    if(confirm){
      NProgress.start();
      Firebase.database().ref(`properties/${propertyId}`).remove((e)=>{
        if(e !== null){
          window.alert(`Error`);
        }
        else{
          let {properties} = this.state;
          _.unset(properties, `${propertyId}`);
          NProgress.done();
          this.setState({properties});
        }

      })
    }

  },
  getProperties: function(){
    let properties = [];
    if(!_.isEmpty(this.state.properties)){
      _.forEach(this.state.properties, (property, k)=>{
        properties.push(<tr key={k}>
          <td width="75%">{property.title}</td>
          <td>
            <Link className="btn btn-small" to={`${this.context.lang}/user/dashboard/properties/manage/${k}`}>
              <i className="fa fa-pencil-square"/> <FormattedMessage id="userProperties.edit"/>
            </Link>
            <a className="btn btn-small" href="#" onClick={(e)=>this.handleDeleteProperty(e,k)}>
              <i className="fa fa-trash"/> <FormattedMessage id="userProperties.delete"/>
            </a>

            <a className="btn btn-small" href="#" onClick={(e)=>{
             e.preventDefault();this.setState({showUpgrade: true});
             }
            }>
              <i className="fa fa-arrow-up"/> <FormattedMessage id="userProperties.upgrade"/>
            </a>

          </td>
        </tr>)
      });

    }
    else{
      properties.push(<tr key={`property-0`}>
        <td colSpan="3">
          <p className="text-center">
            <FormattedMessage id="userProperties.noProperties"/>
          </p>
        </td>
      </tr>);
    }

    return properties;
  },
  render: function(){
    if(!this.state.loaded)
      return <Loader title="loading"/>;

    return (
      <div className="page-wrap">

        <div className="container">
          <div className="page-contents">
            <h2 className="page-title">
              <FormattedMessage id="screen.secure.properties.pageTitle"/>

              <Link className="btn btn-danger pull-right" to={`${this.context.lang}/user/dashboard/properties/add`}>
                <i className="fa fa-plus"/> <FormattedMessage id="contextualMenu.addProperty"/>
              </Link>
            </h2>

            <div className="typography">
              <table className="table table-striped table-hover user-properties-listing">
                <thead>
                <tr>
                  <th>
                    <FormattedMessage id="screen.secure.properties.listing.propertyTitle"/>
                  </th>
                  <th>
                    <FormattedMessage id="screen.secure.properties.listing.manageProperty"/>
                  </th>
                </tr>
                </thead>
                <tbody>
                { this.getProperties()}
                </tbody>
              </table>
            </div>

            {this.state.showUpgrade ?
              <FeatureLevelsModal onClose={()=> this.setState({showUpgrade:false})}
                                  onSubmit={this.submit}/>
              : null
            }

          </div>
        </div>
      </div>
    )
  }


});


export default MyProperties;
