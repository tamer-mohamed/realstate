import React from 'react';
import ReactFireMixin from 'reactfire';
import Firebase from 'firebase';
import {FormattedMessage,intlShape, injectIntl} from 'react-intl';

//components
const MyProperties = React.createClass({
  mixins: [ReactFireMixin],
  contextTypes: {
    user: React.PropTypes.object
  },
  getInitialState: function(){
    return {
      properties: []
    }
  },
  componentWillMount: function(){
    let ref = firebase.database().ref("properties");
    this.bindAsArray(ref.orderByChild("addedBy").equalTo(this.context.user.uid), 'properties');
  },
  render: function(){
    return (
      <div className="page-wrap">

        <div className="container">
          <div className="page-contents">
            <h2 className="page-title">
              <FormattedMessage id="screen.secure.properties.pageTitle"/></h2>
            <table className="table table-striped table-hover user-properties-listing">
              <tbody>
              {
                this.state.properties.map((property)=>{
                  return (
                    <tr key={property['.key']}>
                      <td width="75%">{property.title}</td>
                      <td>{property.featuredLevel}</td>
                      <td><a href="#">Edit</a></td>
                      <td><a href="#">Delete</a></td>
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
