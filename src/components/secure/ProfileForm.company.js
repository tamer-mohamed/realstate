import React from 'react';
import { Form } from 'formsy-react';
import InputField from '../form/Input';
import Textarea from '../form/Textarea';
import {FormattedMessage,intlShape, injectIntl} from 'react-intl';
import Dropzone from '../form/Dropzone';
import q from 'q';

const ProfileForm = React.createClass({

  propTypes: {
    user: React.PropTypes.object.isRequired
  },
  contextTypes: {
    lang: React.PropTypes.string,
    pushNotification: React.PropTypes.func
  },

  render: function(){
    return (
      <div className="row">
        <div className="col-md-12">
          <h6 className="fieldset-title">
            <FormattedMessage id="forms.userProfile.labels.companyInfo"/>
          </h6>
          <div className="row">
            <InputField className="col-md-6"
                        title={"forms.userProfile.labels.companyName"}
                        value={this.props.user.companyName}
                        name="companyName"
                        required/>
          </div>

          <div className="row">
            <Dropzone className="col-md-3"
                      title={"forms.userProfile.labels.companyLogo"}
                      name="companyLogo"/>
          </div>

        </div>
      </div>
    );
  }

});

export default ProfileForm;
