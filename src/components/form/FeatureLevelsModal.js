import React from 'react';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import ReactFireMixin from 'reactfire';
import {FormattedMessage,intlShape, injectIntl} from 'react-intl';
import { Form } from 'formsy-react';
// components
import CheckGroup from './CheckGroup';

const FeatureLevelsModal = React.createClass({
  mixins: [ReactFireMixin],
  propTypes: function(){
    return {
      editMode: React.PropTypes.bool,
      isOpen: React.PropTypes.bool,
      totalSum: React.PropTypes.number,
      propertyLevel: React.PropTypes.array,
      onClose: React.PropTypes.func,
      onSubmit: React.PropTypes.func
    }
  },
  getDefaultProps: function(){
    return {
      editMode: false,
      isOpen: false
    }
  },
  getInitialState: function(){
    return {
      isShowingModal: this.props.isOpen,
      propertyLevel: this.props.propertyLevel || [],
      propertyLevels: [],
      totalSum: this.props.totalSum || 0
    }
  },
  componentWillMount: function(){
    this.bindAsArray(firebase.database().ref(`config/featuredLevels`), 'propertyLevels');
  },
  closeModal: function(){
    this.setState({isShowingModal: false});
  },
  handleClose: function(){
    if(this.props.onClose)
      this.props.onClose();

    this.closeModal();
  },
  handleSubmit: function(){
    if(this.props.onSubmit)
      this.props.onSubmit();

    this.closeModal();
  },
  handleClick: function(){
    this.setState({isShowingModal: true})
  },
  shouldComponentUpdate: function(nextProps, nextState){
    return nextProps.isOpen !== this.props.isOpen ||
      this.state.isShowingModal !== nextState.isShowingModal ||
      this.state.totalSum !== nextState.totalSum;
  },
  calculateTotal: function(checkedValues){
    let total = 0;

    _.forEach(this.state.propertyLevels, (v, k)=>{
      // since bindAsArray starts from 0 and values ID starts from 1
      let key = k + 1;
      if(checkedValues[key])
        total += this.state.propertyLevels[k].price;
    });

    this.setState({totalSum: total});
  },
  render: function(){
    return (
      <div>
        {
          this.props.isOpen || this.state.isShowingModal ?
            <ModalContainer onClose={this.handleClose}>
              <ModalDialog onClose={this.handleClose} className="modal-featureLevels">
                <h5><FormattedMessage id="forms.property.add.labels.featuredLevel"/></h5>

                <Form onsubmit={this.handleSubmit}>

                  { !_.isEmpty(this.state.propertyLevels) ?
                    <div>

                      <div className="well">
                        <div className="row">
                          <div className="col-md-12">

                            <p className="alert alert-info">
                              <FormattedMessage id="forms.property.add.labels.featuredLevel.description"/>
                            </p>

                            <CheckGroup title="forms.property.add.labels.featuredLevel"
                                        items={this.state.propertyLevels}
                                        onChange={this.calculateTotal}
                                        name="featuredLevel"/>

                            <hr/>
                            <h5>
                              <FormattedMessage id="totalSum"/>: {this.state.totalSum} <FormattedMessage
                              id="settings.currency"/>
                            </h5>
                          </div>
                        </div>
                      </div>

                      <button type="submit" className="btn btn-danger pull-right">
                        <FormattedMessage id="forms.generic.update"/></button>
                    </div>
                    : null
                  }
                </Form>
              </ModalDialog>
            </ModalContainer>
            : null
        }
      </div>);
  }

});

export default FeatureLevelsModal;
