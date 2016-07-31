import React from 'react';
import Firebase from 'firebase';
import {FormattedMessage,intlShape, injectIntl} from 'react-intl';
import q from 'q';
import { Form } from 'formsy-react';
import InputField from '../form/Input';
import Textarea from '../form/Textarea';
import FileStorage from '../../models/FileStorage';
import CompanyForm from './ProfileForm.company';
import Dropzone from '../form/Dropzone';


const ProfileForm = React.createClass({

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
    let userCompanyPicRef;
    const {user,userId} = this.props;
    let userProfilePicRef = `users/${this.props.userId}/profilePic`;
    if(user.type === 1)
      userCompanyPicRef = `users/${this.props.userId}/companyLogo`;

    let data = {
      fname: values.fname,
      additionalMail: values.additionalMail || null,
      phonenumber: values.phonenumber,
      companyName: values.companyName || null,
      isPhoneNumberPublic: false,
      intro: values.intro || null
    };

    let updateUser = (userData, onSuccess)=>{
      Firebase.database().ref('users/' + this.props.userId).update(userData, ()=>{
        onSuccess();
      });
    };


    if(this.refs.form.state.isValid){

      if(this.props.user.image !== values.profilePic ||
        (user.type === 1 && this.props.user.compnayLogo !== values.compnayLogo)
      ){
        FileStorage.upload(userCompanyPicRef, [values.companyLogo], {
          onSuccess: (fileNames)=>{
            this.deleteFile(userCompanyPicRef, this.props.user.companyLogo, {
              onSuccess: ()=>{
                data.companyLogo = fileNames[0];
                updateUser(data,
                  ()=>{
                    console.log('DONE');
                  });
              },
              onFail: ()=>{

              }
            })
          },
          onUpdate: ()=>{

          }
        });
      }

      switch(true){
        case user.type === 1 && this.props.user.compnayLogo !== values.compnayLogo:

          FileStorage.upload(userCompanyPicRef, [values.companyLogo], {
            onSuccess: (fileNames)=>{
              this.deleteFile(userCompanyPicRef, this.props.user.companyLogo, {
                onSuccess: ()=>{
                  data.companyLogo = fileNames[0];
                  updateUser(data,
                    ()=>{
                      console.log('DONE');
                    });
                },
                onFail: ()=>{

                }
              })
            },
            onUpdate: ()=>{

            }
          });

          break;
        case this.props.user.image !== values.profilePic :

          FileStorage.upload(userProfilePicRef, [values.profilePic], {
            onSuccess: ()=>{
              this.deleteFile(userProfilePicRef, this.props.user.image, {
                onSuccess: ()=>{
                  updateUser(data,
                    ()=>{
                      console.log('DONE');
                    });
                },
                onFail: ()=>{

                }
              });
            },
            onUpdate: ()=>{

            }
          });

          break;
        default:

          updateUser(data, ()=>{
            console.log('DONE');
          });

          break;
      }


    }
    else{
      alert('NoT VALUED');
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
              <InputField className="col-md-6"
                          title={"forms.userProfile.labels.name"}
                          value={this.props.user.fname}
                          name="fname"
                          required/>
              <InputField className="col-md-6"
                          title={"forms.userProfile.labels.additionalMail"}
                          value={this.props.user.additionalMail}
                          name="additionalMail"/>

              <div className="row">
                <Dropzone className="col-md-3"
                          title={"forms.userProfile.labels.profilePic"}
                          name="profilePic"/>
              </div>

            </div>
            <div className="row">
              <InputField className="col-md-6"
                          title={"forms.userProfile.labels.phoneNumber"}
                          value={this.props.user.phonenumber}
                          name="phonenumber"
                          required/>

            <Textarea className="col-md-6"
                      name="intro"
                      title={"forms.userProfile.labels.intro"}/>
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
