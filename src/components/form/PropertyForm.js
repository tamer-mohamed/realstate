import React from 'react';
import ReactFireMixin from 'reactfire';
import { Form } from 'formsy-react';
import {hashHistory} from 'react-router';
import {FormattedMessage,intlShape, injectIntl} from 'react-intl';

// form components
import InputField from './Input';
import SelectField from './Select';
import RadioButton from './RadioButton';
import RadioGroup from './RadioGroup';
import AreasInput from './AreasInput';
import PreferencesInput from './PreferencesInput';
import InputPostfixAddon from './InputPostfixAddon';
import FeatureLevelsModal from './FeatureLevelsModal';
import PropertyAddress from './PropertyAddress';
import Purposes from './Purposes';


const PropertyForm = React.createClass({
  mixins: [ReactFireMixin],
  propTypes: {
    intl: intlShape.isRequired,
    editMode: React.PropTypes.bool,
    onSubmit: React.PropTypes.func.isRequired
  },
  contextTypes: {
    lang: React.PropTypes.string
  },
  getDefaultProps: function(){
    return {
      property: {},
      editMode: false
    }
  },
  getInitialState: function(){
    return {
      step: 1,
      formHelpers: {
        locationChanged: false
      }
    }
  },
  componentWillMount: function(){
    this.bindAsArray(firebase.database().ref('purposes'), 'purposes');
    this.bindAsArray(firebase.database().ref('types'), 'types');
    this.bindAsArray(firebase.database().ref('config/featuredLevels'), 'featuredLevels');
  },

  resetForm: function(){
    this.refs.form.reset();
  },
  nextStep: function(){
    let step = this.state.step;
    let nextStep = step + 1;
    this.setState({step: nextStep});
  },
  formatPreferences: function(values){
    let prefrencePrefix = 'property-preference-';
    let propertyPref = {};
    _.forEach(values.type.preferences, function(v, k){
      propertyPref[k] = parseInt(values[prefrencePrefix + k], 10);
    });

    return propertyPref;
  },
  submit: function(values){

    const {formatMessage} = this.props.intl;
    //TODO: set validation for area
    if(this.refs.form.state.isValid){
      if(this.props.editMode){
        values.preferences = this.formatPreferences(values);
        this.props.onSubmit(values);
      }

      else{

        switch(this.state.step){
          case 1:
            this.nextStep();
            break;
          case 2:
            let stepOneValues = this.refs.form.getModel();
            stepOneValues.preferences = this.formatPreferences(stepOneValues);


            this.props.onSubmit({
              1: stepOneValues,
              2: values
            });

            this.refs.form.reset();
            hashHistory.push(`${this.context.lang}/user/dashboard/properties`);
            break;
        }
      }


    }
    else{
      this.setState({formResult: formatMessage({id: `forms.validations.correctErrors`})});
    }

  },
  render: function(){
    const {formatMessage} = this.props.intl;
    const property = this.props.property;
    const submitTextId = this.props.editMode? "forms.generic.update": "forms.generic.add";

    return (<Form ref="form" onSubmit={this.submit}>

      <div className="row">
        <div className="col-md-12">
          <h6 className="fieldset-title">
            <FormattedMessage id="forms.property.add.labels.genericInfo"/>
          </h6>
          <div className="row">
            <InputField className="col-md-6"
                        title={"forms.property.add.fields.title"}
                        value={property.title}
                        name="title"
                        required/>
          </div>
          <div className="row">
            <InputPostfixAddon className="col-md-3"
                               title={"forms.property.add.fields.price"}
                               name="price"
                               addOnLabel={formatMessage({id:"settings.currency"})}
                               validations={{isNumeric:true,minLength:1}}
                               value={property.price}
                               validationErrors={{
                                  isNumeric:formatMessage({id:"forms.validations.generic.isNumeric"}),
                                  isDefaultRequiredValue: formatMessage({id:"forms.validations.generic.required"})
                                  }} required/>

            <InputPostfixAddon className="col-md-3"
                               title={"forms.property.add.fields.space"}
                               name="space"
                               addOnLabel={"m2"}
                               value={property.space}
                               validations="isNumeric"
                               validationError={formatMessage({id:"forms.validations.generic.isNumeric"})}
                               required/>

            <Purposes className="col-md-3"
                      value={property.purpose}
                      title={"forms.property.add.fields.purpose"}/>
          </div>
        </div>
      </div>


      <div className="row">
        <div className="col-md-12">
          <h6 className="fieldset-title">
            <FormattedMessage id="forms.property.add.labels.address"/>
          </h6>
        </div>

        <PropertyAddress editMode={this.props.editMode} value={{location:property.location,area:property.area}}/>

      </div>


      <div className="row">
        <div className="col-md-12">
          <h6 className="fieldset-title">
            <FormattedMessage id="forms.property.add.labels.info"/>
          </h6>
        </div>

        <PreferencesInput className="col-md-12"
                          intl={this.props.intl}
                          editMode={this.props.editMode}
                          value={{type:property.type,preferences:property.preferences}}
                          title={"forms.property.add.fields.type"}
                          name="type"/>
      </div>

      {this.state.step === 2 ?
        <FeatureLevelsModal onClose={()=> this.setState({step:1})}
                            onSubmit={this.submit}/>
        : null
      }

      <div className="row">
        <div className="col-lg-12">
          <div className="input-group input-group-lg">
            <input type="submit" className="btn btn-primary" value={formatMessage({id:submitTextId})}/>
          </div>
        </div>
      </div>

    </Form>);
  }

});

export default injectIntl(PropertyForm);
