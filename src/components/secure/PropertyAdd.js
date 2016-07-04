import React from 'react';
import ReactFireMixin from 'reactfire';
import { Form } from 'formsy-react';
import Firebase from 'firebase';
import { If, Then, Else } from 'react-if';
import {FormattedMessage,intlShape, injectIntl} from 'react-intl';
// form components
import InputField from '../form/Input';
import SelectField from '../form/Select';
import RadioButton from '../form/RadioButton';
import InputPostfixAddon from '../form/InputPostfixAddon';


//components
const PropertyAdd = React.createClass({
  mixins: [ReactFireMixin],
  propTypes: {
    intl: intlShape.isRequired,
  },
  contextTypes: {
    user: React.PropTypes.any
  },
  getInitialState: function(){
    return {
      formResult: null,
      purposes: [],
      locations: [],
      featuredLevels: []
    };
  },
  componentWillMount: function(){
    this.bindAsArray(firebase.database().ref('purposes'), 'purposes');
    this.bindAsArray(firebase.database().ref('locations'), 'locations');
    this.bindAsArray(firebase.database().ref('types'), 'types');
    this.bindAsArray(firebase.database().ref('config/featuredLevels'), 'featuredLevels');
  },
  componentWillUnMount: function(){
    this.unbind('purposes');
    this.unbind('locations');
    this.unbind('types');
  },
  updateAreas: function(location){
    if(typeof this.state.areas !== 'undefined')
      this.unbind('areas');

    this.bindAsArray(firebase.database().ref(`areas/${location}`), 'areas');
  },
  submit: function(data, reset){

    let {formatMessage} = this.props.intl;

    //reset errors
    this.setState({formResult: null});

    if(this.refs.form.state.isValid){
      firebase.database().ref('properties').push({
        title: data.title,
        location: data.location.value,
        price: data.price,
        area: data.area.value,
        space: data.space,
        type: data.type.value,
        purpose: data.purpose.value,
        featuredLevel: data.featuredLevel,
        addedBy: this.context.user.uid
      }, (e)=>{
        if(e === null){
          this.setState({formResult: true});
          this.resetForm();
        }
        else{
          this.setState({formResult: formatMessage({id: `forms.errors.property.add`})});
        }
      })
    }

    else{
      this.setState({formResult: formatMessage({id: `forms.validations.correctErrors`})});
    }

  },
  enableButton: function(){
    this.setState({canSubmit: true});
  },
  disableButton: function(){
    this.setState({canSubmit: false});
  },
  resetForm: function(){
    this.refs.form.reset();
  },
  render: function(){
    const {formatMessage} = this.props.intl;

    let purposes = this.state.purposes.map((p)=>{
      return {value: p['.key'], title: p['.value']}
    });

    let locations = this.state.locations.map((p)=>{
      return {value: p['.key'], title: p['.value']}
    });

    let types = this.state.types.map((p)=>{
      return {value: p['.key'], title: p['.value']}
    });


    let areaSelect = "";
    if(typeof this.state.areas !== 'undefined'){
      let options = this.state.areas.map((p)=>{
        return {value: p['.key'], title: p['.value']}
      });
      areaSelect =
        <div className="row"><SelectField className="col-md-4 " title={"forms.property.add.fields.area"}
                                          name="area" options={options} value={options[0]}/></div>;
    }
    else if(this.state.locations.length === 1){
      this.updateAreas(this.state.locations[0]['.key']);
    }

    return (
      <div className="page-wrap">

        <div className="container">
          <div className="page-contents">
            <h2 className="page-title">
              <FormattedMessage id="screen.secure.properties.add.pageTitle"/></h2>
            <div className="row">
              <Form ref="form" onSubmit={this.submit}
                    className="login">

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
                      <InputField className="col-md-6" title={"forms.property.add.fields.title"} name="title"
                                  required/>
                    </div>
                    <div className="row">
                      <InputPostfixAddon className="col-md-3"
                                         title={"forms.property.add.fields.price"}
                                         name="price"
                                         addOnLabel={formatMessage({id:"settings.currency"})}
                                         validations={{isNumeric:true,minLength:1}}
                                         validationErrors={{
                                  isNumeric:formatMessage({id:"forms.validations.generic.isNumeric"}),
                                  isDefaultRequiredValue: formatMessage({id:"forms.validations.generic.required"})
                                  }} required/>

                      <InputPostfixAddon className="col-md-3"
                                         title={"forms.property.add.fields.space"}
                                         name="space"
                                         addOnLabel={"m2"}
                                         validations="isNumeric"
                                         validationError={formatMessage({id:"forms.validations.generic.isNumeric"})}
                                         required/>

                      <SelectField className="col-md-3" title={"forms.property.add.fields.purpose"} name="purpose"
                                   options={purposes} value={purposes[0]}/>
                    </div>
                  </div>
                </div>


                <div className="row">
                  <div className="col-md-12">
                    <h6 className="fieldset-title">
                      <FormattedMessage id="forms.property.add.labels.address"/>
                    </h6>
                  </div>

                  <SelectField className="col-md-4" title={"forms.property.add.fields.type"} name="type"
                               options={types} value={types[0]}/>
                  <SelectField className="col-md-4" title={"forms.property.add.fields.location"}
                               name="location" options={locations}
                               onChange={(e)=>this.updateAreas(e.currentTarget.value)} value={locations[0]}/>

                  {areaSelect}

                </div>


                <div className="row">
                  <div className="col-md-12">
                    <h6 className="fieldset-title">
                      <FormattedMessage id="forms.property.add.labels.featuredLevel"/>
                    </h6>
                    <div className="input-group">
                      {this.state.featuredLevels.map((level)=>{
                        return (
                          <RadioButton key={level['.key']} type="radio" value={level['.key']}
                                         title={`featuredLevel.${level['.value']}`}
                                       name="featuredLevel"/>
                        )
                      })}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    <div className="input-group input-group-lg">
                      <input type="submit" className="btn btn-primary" value={formatMessage({id:"forms.generic.add"})}/>
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
