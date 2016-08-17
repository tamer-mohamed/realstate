import React from 'react';
import ReactFireMixin from 'reactfire';
import { Form } from 'formsy-react';
import {hashHistory} from 'react-router';
import NProgress from "nprogress";
import {FormattedMessage,intlShape, injectIntl} from 'react-intl';
import q from 'q';

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
import Dropzone from './Dropzone';
import Image from '../Image'
import PropertyImageField from './PropertyImage';
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
      property: this.props.property,
      images: this.props.property.images || [],
      imagesToUpload: [],
      formHelpers: {
        locationChanged: false
      }
    }
  },

  resetForm: function(){
    this.refs.form.reset();
  },
  nextStep: function(){
    let step = this.state.step;
    let nextStep = step + 1;
    this.setState({step: nextStep});
  },
  // TODO: move to FileStorage module
  deleteImages: function(images, {onSuccess}){

    if(_.isEmpty(images))
      onSuccess();


    let promises = [];
    _.forEach(images, (image, k)=>{
      let promise = q.defer();

      this.deleteImage(image, {
        onSuccess: ()=>{
          promise.resolve();
        },
        onFail: (e)=>{
          promise.reject(e);
        }
      });

      promises.push(promise.promise);
    });

    q.all(promises).then(()=>{
      onSuccess();
    })

  },

  // TODO: move to FileStorage module
  deleteImage: function(image, {onSuccess,onFail}){
    const {formatMessage} = this.props.intl;
    FileStorage.delete(`images/${this.props.propId}/${image}`).then(onSuccess).catch((e)=>{
      this.context.pushNotification({message: formatMessage({id: "error.imageSrc"}), level: 'error'});
      onFail(e);
    })
  },
  submit: function(values){
    NProgress.start();

    const {isEditMode} = this.props;
    let imagesToDelete = values.propertyImagesToDelete;

    if(isEditMode){
      this.deleteImages(imagesToDelete, {
        onSuccess: ()=>{
          let reIndexed = _.filter(values.propertyImagesToUpload, (f)=> f ? true : false);
          FileStorage.upload('images/' + this.props.propId, reIndexed, {
            onUpdate: ()=>{

            },
            onSuccess: (fileNames)=>{
              values.propertyImages = _.concat(_.filter(this.state.property.images, function(imageName){
                return _.indexOf(imagesToDelete, imageName) === -1;
              }), fileNames);

              this.props.onSubmit(values);
              NProgress.done();
            }
          });
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
          stepOneValues.imagesToUpload = this.state.imagesToUpload;


          this.props.onSubmit({
            1: stepOneValues,
            2: values
          });
          break;
      }
    }

  },
  render: function(){
    const {formatMessage} = this.props.intl;
    const property = this.state.property;
    const submitTextId = this.props.editMode ? "forms.generic.update" : "forms.generic.add";

    return (<Form ref="form" preventExternalInvalidation onValidSubmit={this.submit}>

      <div className="row">
        <div className="col-md-12">
          <h6 className="fieldset-title">
            <FormattedMessage id="forms.property.add.labels.genericInfo"/>
          </h6>
          <div className="row">
            <InputField className="col-md-6"
                        placeholder={"forms.property.add.fields.title"}
                        value={property.title || null}
                        name="title"
                        validationErrors={{
                    isExisty: formatMessage({id: "forms.validations.generic.required"})
                    }}
                        validations={{
                    isExisty:true
                    }}
                        required/>
          </div>
          <div className="row">
            <InputPostfixAddon className="col-md-3"
                               title={"forms.property.add.fields.price"}
                               name="price"
                               addOnLabel={formatMessage({id:"settings.currency"})}
                               validations={{isNumeric:true,minLength:1}}
                               value={property.price || null}
                               validationErrors={{
                                  isExisty: formatMessage({id: "forms.validations.generic.required"}),
                                  isNumeric:formatMessage({id:"forms.validations.generic.isNumeric"})
                               }}
                               validations={{
                                  isExisty:true,
                                  isNumeric:true
                                }}
                               required/>

            <InputPostfixAddon className="col-md-3"
                               title={"forms.property.add.fields.space"}
                               name="space"
                               addOnLabel={<span>m<sup>2</sup></span>}
                               value={property.space || null}
                               validationErrors={{
                                  isExisty: formatMessage({id: "forms.validations.generic.required"}),
                                  isNumeric:formatMessage({id:"forms.validations.generic.isNumeric"})
                                  }}
                               validations={{
                                  isExisty:true,
                                  isNumeric:true
                                  }}
                               required/>

            <Purposes className="col-md-3"
                      editMode={this.props.editMode}
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
            <FormattedMessage id="forms.property.add.fields.propertyImage"/>
          </h6>

          <div className="clearfix">

            <PropertyImageField
              propId={this.props.propId}
              maxImages={this.props.maxImages}
              images={property.images}/>


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
            <input type="submit" formNoValidate={true} className="btn btn-danger"
                   value={formatMessage({id:submitTextId})}/>
          </div>
        </div>
      </div>

    </Form>);
  }

});

export default injectIntl(PropertyForm);
