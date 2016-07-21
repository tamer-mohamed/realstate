import React from 'react';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import ReactFireMixin from 'reactfire';
import {FormattedMessage,intlShape, injectIntl} from 'react-intl';
import _ from 'lodash';
import { Form } from 'formsy-react';
// components
import CheckGroup from './CheckGroup';

const FeatureLevelsModal = React.createClass({
  mixins: [ReactFireMixin],
  propTypes: function(){
    return {
      editMode: React.PropTypes.bool,
      totalSum: React.PropTypes.number,
      propertyLevel: React.PropTypes.array,
      onClose: React.PropTypes.func,
      intl: intlShape.isRequired,
      onSubmit: React.PropTypes.func
    }
  },
  getDefaultProps: function(){
    return {
      editMode: false,
      propertyLevel: [],
      totalSum: 0
    }
  },
  getInitialState: function(){
    return {
      isShowingModal: true,
      propertyLevel: this.props.propertyLevel,
      levels: [], //
      totalSum: this.props.totalSum
    }
  },
  componentWillMount: function(){
    this.bindAsArray(firebase.database().ref(`config/featuredLevels`), 'levels');
  },
  closeModal: function(){
    this.setState({isShowingModal: false});
  },
  handleClose: function(){
    console.log('CALLED');
    if(this.props.onClose)
      this.props.onClose();

    this.closeModal();
  },
  handleSubmit: function(){
    let featuredValues = [];
    _.forEach(this.state.propertyLevel, function(v, k){
      if(v === true)
        featuredValues.push(k);
    });

    if(this.props.onSubmit)
      this.props.onSubmit(featuredValues);

    this.closeModal();

  },
  shouldComponentUpdate: function(nextProps, nextState){
    return this.state.isShowingModal !== nextState.isShowingModal || this.state.totalSum !== nextState.totalSum;
  },
  calculateTotal: function(checkedValues){
    let total = 0;

    _.forEach(this.state.levels, (v, k)=>{
      // since bindAsArray starts from 0 and values ID starts from 1
      let key = k + 1;
      if(checkedValues[key])
        total += this.state.levels[k].price;
    });

    this.setState({totalSum: total, propertyLevel: checkedValues});
  },
  render: function(){
    return (
      <div>
        {this.state.isShowingModal ?
          <ModalContainer onClose={this.handleClose}>
            <ModalDialog onClose={this.handleClose} className="modal-featureLevels">
              <h5><FormattedMessage id="forms.property.add.labels.featuredLevel"/></h5>

              <Form>

                { !_.isEmpty(this.state.levels) ?
                  <div>
                    <div className="well">
                      <div className="row">
                        <div className="col-md-12">

                          <p className="alert alert-info">
                            <FormattedMessage id="forms.property.add.labels.featuredLevel.description"/>
                          </p>

                          <div className="row">
                            <CheckGroup title="forms.property.add.labels.featuredLevel"
                                        items={this.state.levels}
                                        onChange={this.calculateTotal}
                                        className="col-md-12"
                                        name="featuredLevel"/>
                          </div>

                          <hr/>
                          <h5>
                            <FormattedMessage id="totalSum"/>: {this.state.totalSum} <FormattedMessage
                            id="settings.currency"/>
                          </h5>
                        </div>
                      </div>
                    </div>

                    <input type="submit" className="btn btn-danger pull-right" onClick={this.handleSubmit}
                           value="update"/>
                    <FormattedMessage id="forms.generic.update"/>
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

export default injectIntl(FeatureLevelsModal);
