import React from 'react';
import {Form} from 'formsy-react';
import {injectIntl} from 'react-intl';
import mail from '../models/Mail';
import Map from './Map';
import InputField from './form/Input';
import TextareaField from './form/Textarea';

const Contact = React.createClass({

  styles: {
    map: {
      width: "100%",
      height: "625px"
    }
  },
  submit: function(values){
    mail.send(values).then(()=>{

    }).catch((e)=>{

    });
  },
  render: function(){
    const {formatMessage} = this.props.intl;
    return (
      <div className="full-width map-wrap">

        <div id="map-canvas" style={this.styles.map}/>

        <div className="contact-form-wrap">
          <div className="container">
            <div className="row">
              <div className="col-md-4 col-sm-6 col-md-offset-8 col-sm-offset-6">
                <div className="contact-form">
                  <h3>{formatMessage({id:"contactForm.title"})}</h3>
                  <Form preventEternalValidation onValidSubmit={this.submit}>
                    <InputField name="name"
                                showErrors={false}
                                placeholder="contactForm.name"
                                validationErrors={{
                                  isExisty: formatMessage({id: "forms.validations.generic.required"})
                                  }}
                                validations={{
                                  isExisty:true
                                  }}/>
                    <InputField name="email"
                                showErrors={false}
                                placeholder="contactForm.email"
                                validationErrors={{
                                  isExisty: formatMessage({id: "forms.validations.generic.required"}),
                                  isEmail: formatMessage({id: "forms.validations.generic.isEmail"})
                                  }}
                                validations={{
                                  isExisty:true,
                                  isEmail:true
                                  }}/>
                    <InputField name="phone"
                                showErrors={false}
                                placeholder="contactForm.phone"
                                validationErrors={{
                                  isExisty: formatMessage({id: "forms.validations.generic.required"}),
                                  isNumeric:formatMessage({id:"forms.validations.generic.isNumeric"})
                                  }}
                                validations={{
                                  isExisty:true,
                                  isNumeric:true
                                  }}/>
                    <InputField name="subject"
                                placeholder="contactForm.subject"
                                showErrors={false}
                                validationErrors={{
                                  isExisty: formatMessage({id: "forms.validations.generic.required"})
                                  }}
                                validations={{
                                  isExisty:true
                                  }}/>
                    <TextareaField name="message"
                                   showErrors={false}
                                   placeholder="contactForm.message"
                                   validationErrors={{
                                  isExisty: formatMessage({id: "forms.validations.generic.required"})
                                  }}
                                   validations={{
                                  isExisty:true
                                  }}/>
                    <input type="submit" formNoValidate={true} className="btn btn-danger" value="Send Message"/>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }

});

export default injectIntl(Contact);
