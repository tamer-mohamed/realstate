import React from 'react';
import ReactFireMixin from 'reactfire';
import { Form } from 'formsy-react';
import {hashHistory} from 'react-router';
import NProgress from "nprogress";
import {FormattedMessage,intlShape, injectIntl} from 'react-intl';

// form components
import InputField from './Input';
import FileUpload from './FileUpload';
import SelectField from './Select';
import RadioButton from './RadioButton';
import RadioGroup from './RadioGroup';
import AreasInput from './AreasInput';
import PreferencesInput from './PreferencesInput';
import InputPostfixAddon from './InputPostfixAddon';
import FeatureLevelsModal from './FeatureLevelsModal';
import PropertyAddress from './PropertyAddress';
import Purposes from './Purposes';
import Dropzone from './Dropzone';
import Image from '../Image'
import FileStorage from '../../models/FileStorage';


const PropertyForm = React.createClass({
  mixins: [ReactFireMixin],
  propTypes: {
    intl: intlShape.isRequired,
    editMode: React.PropTypes.bool,
    onSubmit: React.PropTypes.func.isRequired
  },
  contextTypes: {
    lang: React.PropTypes.string,
    pushNotification: React.PropTypes.func
  },
  getDefaultProps: function(){
    return {
      property: {},
      maxImages: 3,
      editMode: false
    }
  },
  getInitialState: function(){
    return {
      step: 1,
      imagesToUpload: [],
      propertyImages: this.props.editMode && this.props.property.images ? this.props.property.images : [],
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
  onDrop: function(file){
    let images = this.state.imagesToUpload;
    images.push(file);
    this.setState({imagesToUpload: images});
  },
  generateDropZones: function(num = this.props.maxImages){
    let zones = [];
    for(let i = 0; i < num; i++)
      zones.push(<Dropzone onDrop={this.onDrop} className={"col-md-3"} key={`dropzone-${i}`}
                           name={`propertyImagesToUpload[${i}]`}
                           accept="image/*"/>);

    return zones;
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

    NProgress.start();

    //TODO: set validation for area
    if(this.refs.form.state.isValid){
      if(this.props.editMode){
        values.preferences = this.formatPreferences(values);

        console.log('Property Form ID: ', this.props.propId);
        console.log('Form submitted with values', values);


        FileStorage.upload('images/' + this.props.propId, this.state.imagesToUpload, {
          onUpdate: ()=>{

          },
          onSuccess: (fileNames)=>{
            let updatedPropertyImages;
            let images = this.props.property.images;

            console.log(fileNames);
            console.log('IMAGE', images);

            if(this.props.editMode && _.isArray(images)){
              updatedPropertyImages = _.concat(images, fileNames);
            }
            else{
              updatedPropertyImages = fileNames;
            }

            values.propertyImages = updatedPropertyImages;


            console.log(values.propertyImages);
            NProgress.done();

            this.props.onSubmit(values);
          }
        });


      }

      else{

        switch(this.state.step){
          case 1:
            this.nextStep();
            break;
          case 2:
            let stepOneValues = this.refs.form.getModel();
            stepOneValues.preferences = this.formatPreferences(stepOneValues);
            stepOneValues.imagesToUpload = this.state.imagesToUpload;


            this.props.onSubmit({
              1: stepOneValues,
              2: values
            });
            break;
        }
      }


    }
    else{
      this.context.pushNotification({message: formatMessage({id: "forms.validations.correctErrors"}), level: 'error'});
    }

  },
  render: function(){
    const {formatMessage} = this.props.intl;
    const property = this.props.property;
    const submitTextId = this.props.editMode ? "forms.generic.update" : "forms.generic.add";

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
            <FormattedMessage id="forms.property.add.fields.title"/>
          </h6>

          <div className="clearfix">


            { _.isArray(property.images) && !_.isEmpty(property.images) ?
              <div>
                <h6><FormattedMessage id="upload" values={{value:property.images.length}}/></h6>
                {property.images.map((image)=>{
                  return <div className="col-md-3">
                    <Image url={`images/${this.props.propId}/${image}`}/>
                  </div>;
                })}
                {this.generateDropZones(this.props.maxImages - property.images.length)}
              </div>
              : this.generateDropZones()
            }
          </div>
        </div>


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
            <input type="submit" className="btn btn-danger" value={formatMessage({id:submitTextId})}/>
          </div>
        </div>
      </div>

    </Form>);
  }

});

export default injectIntl(PropertyForm);
