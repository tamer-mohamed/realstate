import React from 'react';
import { Form } from 'formsy-react';
import InputField from '../form/Input';
import Textarea from '../form/Textarea';
import {FormattedMessage,intlShape, injectIntl} from 'react-intl';

import q from 'q';

const ProfileForm = React.createClass({

  propTypes: {
    user: React.PropTypes.object.isRequired
  },
  contextTypes: {
    lang: React.PropTypes.string,
    pushNotification: React.PropTypes.func

    // TODO: contact phone number could be avaliable to all by check mark

  },

  render: function(){
    return (
      <Form>
        <div className="row">
          <div className="col-md-12">
            <h6 className="fieldset-title">
              <FormattedMessage id="forms.userProfile.labels.personalInfo"/>
            </h6>
            <div className="row">
              <InputField className="col-md-6"
                          title={"forms.userProfile.labels.name"}
                          value={this.props.user.fname}
                          name="title"
                          required/>
              <InputField className="col-md-6"
                          title={"forms.userProfile.labels.additionalMail"}
                          name="additionalMail"
                          required/>


            </div>
            <div className="row">
              <InputField className="col-md-6"
                          title={"forms.userProfile.labels.phoneNumber"}
                          name="phonenumber"
                          required/>

            <Textarea className="col-md-6"
                      name="intro"
                      title={"forms.userProfile.labels.intro"}/>
            </div>
          </div>
        </div>
      </Form>
    );
  }

});

export default ProfileForm;
