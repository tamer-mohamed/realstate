import React from 'react';
import ReactFireMixin from 'reactfire';
import Firebase from 'firebase';
import {Link} from 'react-router';
import {FormattedMessage,intlShape, injectIntl} from 'react-intl';

//components
const MyProperties = React.createClass({
  mixins: [ReactFireMixin],
  contextTypes: {
    user: React.PropTypes.object,
    lang: React.PropTypes.string
  },
  getInitialState: function(){
    return {
      properties: []
    }
  },
  componentWillMount: function(){
    let ref = Firebase.database().ref("properties");
    this.bindAsArray(ref.orderByChild("addedBy").equalTo(this.context.user.uid), 'properties');
  },
  handleDeleteProperty: function(e, propertyId){
    e.preventDefault();
    let confirm = window.confirm('are you sure?');
    if(confirm){
      Firebase.database().ref(`properties/${propertyId}`).remove((e)=>{
        if(e !== null){
          window.alert(`Error`);
        }
      })
    }

  },
  render: function(){
    return (
      <div className="page-wrap">

        <div className="container">
          <div className="page-contents">
            <h2 className="page-title">
              <FormattedMessage id="screen.secure.properties.pageTitle"/>
            </h2>


            <table className="table table-striped table-hover user-properties-listing">
              <thead>
              <tr>
                <th>
                  <FormattedMessage id="screen.secure.properties.listing.propertyTitle"/>
                </th>
                <th>
                  <FormattedMessage id="screen.secure.properties.listing.propertyFeatureLevel"/>
                </th>
                <th>
                  <FormattedMessage id="screen.secure.properties.listing.manageProperty"/>
                </th>
              </tr>
              </thead>
              <tbody>
              {
                this.state.properties.map((property)=>{
                  return (
                    <tr key={property['.key']}>
                      <td width="75%">{property.title}</td>
                      <td>{property.featuredLevel}</td>
                      <td>
                        <Link to={`${this.context.lang}/user/dashboard/properties/manage/${property['.key']}`}>
                          Edit
                        </Link>
                      </td>
                      <td>
                        <a href="#" onClick={(e)=>this.handleDeleteProperty(e,property['.key'])}>
                          Delete
                        </a>
                      </td>
                    </tr>
                  )
                })
              }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }


});


export default MyProperties;
