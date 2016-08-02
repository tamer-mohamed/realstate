import React from 'react';
import { Form } from 'formsy-react';
import InputField from '../form/Input';
import Textarea from '../form/Textarea';
import {FormattedMessage,intlShape, injectIntl} from 'react-intl';
import Dropzone from '../form/Dropzone';
import ImageDropZone from '../form/ImageDropZone';
import q from 'q';

const ProfileForm = React.createClass({

  propTypes: {
    user: React.PropTypes.object.isRequired
  },
  contextTypes: {
    lang: React.PropTypes.string,
    pushNotification: React.PropTypes.func
  },

  userCompanyPicRef: function(){
    return `users/${this.props.userId}/companyLogo`
  },
  render: function(){
    return (
      <div className="row">
        <div className="col-md-12">
          <h6 className="fieldset-title">
            <FormattedMessage id="forms.userProfile.labels.companyInfo"/>
          </h6>
          <div className="row">
            <InputField className="col-md-8"
                        title={"forms.userProfile.labels.companyName"}
                        value={this.props.user.companyName}
                        name="companyName"
                        required/>

            <div className="col-md-4">
              <ImageDropZone itemClassName="col-md-12" className="col-md-12" image={this.props.user.companyLogo}
                             name="companyLogo"
                             title="forms.userProfile.labels.companyLogo"
                             picRef={this.userCompanyPicRef()}/>
            </div>
          </div>

        </div>
      </div>
    );
  }

});

export default ProfileForm;
