import React from 'react';
import ReactFireMixin from 'reactfire';
import { Form } from 'formsy-react';
import {FormattedMessage,intlShape, injectIntl} from 'react-intl';

import Location from './LocationField';
import Areas from './AreasInput';


const PropertyAddress = React.createClass({
  mixins: [ReactFireMixin],
  propTypes: {
    intl: intlShape.isRequired,
    location: React.PropTypes.string,
    editMode: React.PropTypes.bool
  },
  getInitialState: function(){
    return {
      selectedLocation: null
    }
  },
  getDefaultProps: function(){
    return {
      editMode: false
    }
  },
  shouldComponentUpdate: function(nextProps, nextState){
    return nextProps.location !== this.props.location || this.state.selectedLocation != nextState.selectedLocation;
  },
  updateAreas: function(location){

    if(this.refs.areaInput)
      this.refs.areaInput.resetValue();
    this.setState({selectedLocation: location})
  },
  render: function(){
    return (
      <div>
        <Location className="col-md-4"
                  title="forms.property.add.fields.location"
                  editMode={this.props.editMode}
                  onLoaded={this.updateAreas}
                  onChange={this.updateAreas}/>

        {this.state.selectedLocation ? <Areas ref="areaInput" location={this.state.selectedLocation}
                                              className="col-md-4"
                                              title="forms.property.add.fields.area"
                                              name={"area"}/> : null}
      </div>
    );
  }


});

export default injectIntl(PropertyAddress);
