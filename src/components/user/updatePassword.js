import React from 'react';
import {injectIntl} from 'react-intl';
import InputField from '../form/Input';

const UpdatePassword = React.createClass({

  render: function(){
    let {formatMessage} = this.props.intl;

    return (
      <div className="row">
        <InputField className="form-group col-md-6"
                    placeholder="forms.user.register.fields.password"
                    name="password"
                    type="password"
                    value={undefined}
                    validations={{
                                minLength: 4
                              }} validationErrors={{
                                minLength: formatMessage({id:"forms.validations.user.passwordLength"},{value: 7})
                              }} required/>

        <InputField className="form-group col-md-6"
                    placeholder="forms.user.register.fields.repeatPassword"
                    value={undefined}
                    type="password"
                    name="repeatPassword" validations="equalsField:password"
                    validationErrors={{
      equalsField: formatMessage({id:'forms.validations.user.passwordMatch'})
    }} required/>

      </div>
    );
  }
});

export default injectIntl(UpdatePassword);
