import React from 'react';
import ReactFireMixin from 'reactfire';
import { Form } from 'formsy-react';
import Firebase from 'firebase';
import { If, Then, Else } from 'react-if';
import {FormattedMessage,intlShape, injectIntl} from 'react-intl';
import _ from 'lodash';
// form components
import InputField from '../form/Input';
import SelectField from '../form/Select';
import RadioGroup from '../form/RadioGroup';
import AreasInput from '../form/AreasInput';
import PreferencesInput from '../form/PreferencesInput';
import InputPostfixAddon from '../form/InputPostfixAddon';


//components
const PropertyAdd = React.createClass({
  mixins: [ReactFireMixin],
  propTypes: {
    intl: intlShape.isRequired
  },
  contextTypes: {
    user: React.PropTypes.any
  },
  getInitialState: function(){
    return {
      formResult: null,
      property: {},
      propertyLocation: null,
      purposes: [],
      locations: [],
      types: [],
    };
  },
  componentWillMount: function(){
    let propertyId = this.props.params.propId;

    this.bindAsObject(firebase.database().ref(`properties/${propertyId}`), 'property');
    this.bindAsArray(firebase.database().ref(`locations`), 'locations');
    this.bindAsArray(firebase.database().ref(`purposes`), 'purposes');
    this.bindAsArray(firebase.database().ref(`types`), 'types');
    this.bindAsArray(firebase.database().ref(`config/featuredLevels`), 'featuredLevels');

  },
  updateAreas: function(location){
    this.refs.areaInput.resetValue();
    this.setState({propertyLocation: location});
  },
  submit: function(data, reset){

    let {formatMessage} = this.props.intl;

    //reset errors
    this.setState({formResult: null});


    if(this.refs.form.state.isValid){
      let prefrencePrefix = 'property-preference-';

      let propertyPref = {};
      _.forEach(data.type.preferences, function(v, k){
        propertyPref[k] = data[prefrencePrefix + k];
      });

      firebase.database().ref(`properties/${this.props.params.propId}`).update({
        title: data.title,
        location: data.location,
        price: data.price,
        area: data.area,
        space: data.space,
        type: data.type,
        preferences: propertyPref,
        purpose: data.purpose,
        addedBy: this.context.user.uid
      }).then(()=>{
        this.setState({formResult: true});
      }).catch((e)=> window.alert(e));
    }

    else{
      this.setState({formResult: formatMessage({id: `forms.validations.correctErrors`})});
    }

  },
  resetForm: function(){
    this.refs.form.reset();
  },
  render: function(){
    const {formatMessage} = this.props.intl;
    const property = this.state.property;

    if(Object.keys(property).length === 0){

      return <h3>LOADING</h3>;
    }

    let purposes = _.map(this.state.purposes, (p)=>{
      return {value: p['.key'], title: p['.value']}
    });

    let locations = _.map(this.state.locations, (p)=>{
      return {value: p['.key'], title: p['.value']}
    });

    let types = _.map(this.state.types, (p)=>{
      return {value: p['.key'], title: p['.value']}
    });

    let areasInput = null;

    if(this.state.locations.length > 0){
      areasInput = <div>
        <SelectField className="col-md-4" title={"forms.property.add.fields.location"}
                     name="location"
                     options={locations}
                     onChange={(e)=>this.updateAreas(e.currentTarget.value)}
                     value={this.state.propertyLocation || property.location}/>
        <AreasInput ref="areaInput" location={this.state.propertyLocation || property.location}
                    className="col-md-4"
                    value={property.area}
                    title="forms.property.add.fields.area"
                    name={"area"}/>
      </div>
    }


    return (
      <div className="page-wrap">

        <div className="container">
          <div className="page-contents">
            <h2 className="page-title">
              <FormattedMessage id="screen.secure.properties.manage.pageTitle"/></h2>
            <div className="row">
              <Form ref="form" onSubmit={this.submit}>

                <If condition={this.state.formResult !== null}>
                  <Then>
                    <If condition={this.state.formResult === true}>
                      <Then>
                        <div className="col-md-12 alert alert-success">
                          <FormattedMessage id="forms.property.success"/>
                        </div>
                      </Then>

                      <Else>
                        <div className="col-md-12 alert alert-error">
                          {this.state.formResult}
                        </div>
                      </Else>
                    </If>
                  </Then>
                </If>


                <div className="row">
                  <div className="col-md-12">
                    <h6 className="fieldset-title">
                      <FormattedMessage id="forms.property.add.labels.genericInfo"/>
                    </h6>
                    <div className="row">
                      <InputField className="col-md-6"
                                  title={"forms.property.add.fields.title"}
                                  name="title"
                                  value={property.title}
                                  required/>
                    </div>
                    <div className="row">
                      <InputPostfixAddon className="col-md-3"
                                         title={"forms.property.add.fields.price"}
                                         name="price"
                                         value={property.price}
                                         addOnLabel={formatMessage({id:"settings.currency"})}
                                         validations={{isNumeric:true,minLength:1}}
                                         validationErrors={{
                                  isNumeric:formatMessage({id:"forms.validations.generic.isNumeric"}),
                                  isDefaultRequiredValue: formatMessage({id:"forms.validations.generic.required"})
                                  }} required/>

                      <InputPostfixAddon className="col-md-3"
                                         title={"forms.property.add.fields.space"}
                                         name="space"
                                         value={property.space}
                                         addOnLabel={"m2"}
                                         validations="isNumeric"
                                         validationError={formatMessage({id:"forms.validations.generic.isNumeric"})}
                                         required/>

                      <SelectField className="col-md-3"
                                   title={"forms.property.add.fields.purpose"}
                                   name="purpose"
                                   options={purposes}
                                   value={property.purpose}/>
                    </div>
                  </div>
                </div>


                <div className="row">
                  <div className="col-md-12">
                    <h6 className="fieldset-title">
                      <FormattedMessage id="forms.property.add.labels.address"/>
                    </h6>
                  </div>
                  {areasInput}

                </div>


                <div className="row">
                  <div className="col-md-12">
                    <h6 className="fieldset-title">
                      <FormattedMessage id="forms.property.add.labels.info"/>
                    </h6>
                  </div>

                  {property ?
                    <PreferencesInput className="col-md-12"
                                      intl={this.props.intl}
                                      editMode={true}
                                      title={"forms.property.add.fields.type"}
                                      value={{type:property.type,preferences:property.preferences}}
                                      name="type"/>
                    : null

                  }
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    <div className="input-group input-group-lg">
                      <input type="submit" className="btn btn-primary"
                             value={formatMessage({id:"forms.generic.update"})}/>
                    </div>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default injectIntl(PropertyAdd);
