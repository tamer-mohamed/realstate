import React from 'react';
import Firebase from 'firebase';
import {FormattedMessage,intlShape, injectIntl} from 'react-intl';
import {hashHistory} from 'react-router';
import q from 'q';
import { Form } from 'formsy-react';
import InputField from '../form/Input';
import Textarea from '../form/Textarea';
import FileStorage from '../../models/FileStorage';
import CompanyForm from './ProfileForm.company';
import ImageDropZone from '../form/ImageDropZone';

const ProfileForm = React.createClass({

  userProfilePicRef: function(){
    return `users/${this.props.userId}/profilePic`
  },
  userCompanyPicRef: function(){
    return `users/${this.props.userId}/companyLogo`
  },
  propTypes: {
    intl: intlShape.isRequired,
    user: React.PropTypes.object.isRequired
  },
  contextTypes: {
    lang: React.PropTypes.string,
    pushNotification: React.PropTypes.func

    // TODO: contact phone number could be avaliable to all by check mark

  },
  // TODO: move to FileStorage module
  deleteFile: function(ref, image, {onSuccess,onFail}){
    const {formatMessage} = this.props.intl;
    FileStorage.delete(`${ref}/${image}`).then(onSuccess).catch((e)=>{
      //incase file doesn't exist, no worries the values will be overridedn.
      //TODO: onNotFound event
      console.log(e);
      if(e.code === 'storage/object-not-found'){
        onSuccess();
      }
      else{
        this.context.pushNotification({message: formatMessage({id: "error.imageSrc"}), level: 'error'});
        onFail(e);
      }

    })
  },
  submit: function(values){
    const {user,userId} = this.props;
    const {formatMessage} = this.props.intl;

    let data = {
      fname: values.fname,
      additionalMail: values.additionalMail || null,
      phonenumber: values.phonenumber,
      companyName: values.companyName || null,
      contactnumber: values.contactnumber,
      intro: values.intro || null
    };

    let updateUser = (userData, onSuccess)=>{
      Firebase.database().ref('users/' + userId).update(userData, ()=>{
        onSuccess();
      });
    };


    if(this.refs.form.state.isValid){
      let promises = [];

      if((user.type === 1 && this.props.user.companyLogo !== values.companyLogo)
      ){
        let companyLogoPromise = q.defer();
        FileStorage.upload(this.userCompanyPicRef(), [values.companyLogo], {
          onSuccess: (fileNames)=>{
            this.deleteFile(this.userCompanyPicRef(), this.props.user.companyLogo, {
              onSuccess: ()=>{
                data.companyLogo = fileNames[0];
                updateUser(data,
                  ()=>{
                    companyLogoPromise.resolve();
                  });
              },
              onFail: ()=>{
                this.context.pushNotification({
                  message: formatMessage({id: "forms.userProfile.error.upload.companyLogo"}),
                  level: 'error'
                });
                companyLogoPromise.reject();
              }
            })
          },
          onUpdate: ()=>{

          }
        });
        promises.push(companyLogoPromise.promise);
      }

      if(this.props.user.image !== values.profilePic){
        let profilePicPromise = q.defer();

        FileStorage.upload(this.userProfilePicRef(), [values.profilePic], {
          onSuccess: (fileNames)=>{
            this.deleteFile(this.userProfilePicRef(), this.props.user.image, {
              onSuccess: ()=>{
                data.image = fileNames[0];
                updateUser(data,
                  ()=>{
                    profilePicPromise.resolve();
                  });
              },
              onFail: ()=>{
                this.context.pushNotification({
                  message: formatMessage({id: "forms.userProfile.error.upload.profilePic"}),
                  level: 'error'
                });
                profilePicPromise.reject();

              }
            });
          },
          onUpdate: ()=>{

          }
        });

        promises.push(profilePicPromise.promise);
      }

      q.all(promises).then(()=>{
        updateUser(data, ()=>{
          hashHistory.push(`${this.context.lang}/user/profile`);
          this.context.pushNotification({message: formatMessage({id: "forms.userProfile.success"}), level: 'success'});
        });

      })


    }
    else{
      this.context.pushNotification({message: formatMessage({id: "forms.validations.correctErrors"}), level: 'error'});
    }

  },
  render: function(){
    const {formatMessage} = this.props.intl;
    return (
      <Form ref="form" onSubmit={this.submit}>
        <div className="row">
          <div className="col-md-12">
            <h6 className="fieldset-title">
              <FormattedMessage id="forms.userProfile.labels.personalInfo"/>
            </h6>
            <div className="row">
              <div className="col-md-8">
                <div className="row">
                  <InputField className="col-md-6"
                              title={"forms.userProfile.labels.name"}
                              value={this.props.user.fname}
                              name="fname"
                              required/>
                  <InputField className="col-md-6"
                              title={"forms.userProfile.labels.additionalMail"}
                              value={this.props.user.additionalMail}
                              validations="isEmail"
                              validationError={formatMessage({id:"forms.validations.generic.isEmail"})}
                              name="additionalMail"/>
                </div>
                <div className="row">
                  <InputField className="col-md-6"
                              title={"forms.userProfile.labels.phoneNumber"}
                              value={this.props.user.phonenumber}
                              name="phonenumber"
                              required/>

                  <InputField className="col-md-6"
                              title={"forms.userProfile.labels.contactNumber"}
                              value={this.props.user.contactnumber}
                              name="contactnumber"/>

                </div>
                <div className="row">
                  <Textarea className="col-md-12"
                            name="intro"
                            value={this.props.user.intro}
                            title={"forms.userProfile.labels.intro"}/>
                </div>
              </div>
              <div className="col-md-4">
                <ImageDropZone itemClassName="col-md-12" image={this.props.user.image}
                               title={"forms.userProfile.labels.profilePic"} name="profilePic"
                               picRef={this.userProfilePicRef()}/>
              </div>

            </div>


            {this.props.user.type === 1 ? <CompanyForm {...this.props} /> : null}

            <div className="row">
              <div className="col-lg-12">
                <div className="input-group input-group-lg">
                  <input type="submit" className="btn btn-danger" value={formatMessage({id:"forms.generic.update"})}/>
                </div>
              </div>
            </div>


          </div>
        </div>
      </Form>
    );
  }

});

export default injectIntl(ProfileForm);
