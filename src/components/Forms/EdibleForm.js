import React, {Component} from 'react';
import {connect} from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import {Field, reduxForm, formValueSelector } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import {Avatar} from '../../containers/Avatar';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import { setDialogIsOpen } from '../../store/dialogs/actions';
import { ImageCropDialog } from '../../containers/ImageCropDialog';
import { withRouter } from 'react-router-dom';
import muiThemeable from 'material-ui/styles/muiThemeable';
import PropTypes from 'prop-types';



class Form extends Component {

  handlePhotoUploadSuccess = (snapshot) =>{
    const { setDialogIsOpen, change}=this.props;
    change('photoURL', snapshot.downloadURL);
    setDialogIsOpen('new_edible_photo', undefined);
  }

  render() {
    const{
      handleSubmit,
      intl,
      initialized,
      setDialogIsOpen,
      dialogs,
      match,
    } = this.props;

    const uid = match.params.uid;

    return (
      <form onSubmit={handleSubmit} style={{
        height: '100%',
        alignItems: 'stretch',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
      <button type="submit" style={{display: 'none'}} />

      <div style={{margin: 15, display: 'flex', flexDirection: 'column'}}>

        <div>
          <Field
            name="photoURL"
            size={120}
            component={Avatar}
            icon={
              <FontIcon
                className="material-icons">
                cake
              </FontIcon>
            }
            ref="photoURL"
            withRef
          />
        </div>


        <FlatButton
          onClick={() => {
            setDialogIsOpen('new_edible_photo', true)
          }}
          disabled={uid === undefined || !initialized}
          containerElement='label'
          primary={true}
          icon={
            <FontIcon
              className="material-icons">
              photo_camera
            </FontIcon>
          }
        />
      </div>

      <div>
        <div>
          <Field
            name="name"
            disabled={!initialized}
            component={TextField}
            hintText={intl.formatMessage({id: 'name_hint'})}
            floatingLabelText={intl.formatMessage({id: 'name_label'})}
            ref="name"
            withRef
          />
        </div>

        <div>
          <Field
            name="ingredients"
            disabled={!initialized}
            component={TextField}
            hintText={intl.formatMessage({id: 'ingredients'})}
            floatingLabelText={intl.formatMessage({id: 'ingredients'})}
            ref="ingredients"
            withRef
          />
        </div>

        <div>
          <Field
            name="directions"
            disabled={!initialized}
            component={TextField}
            hintText={intl.formatMessage({id: 'directions'})}
            floatingLabelText={intl.formatMessage({id: 'directions'})}
            ref="directions"
            withRef
          />
        </div>

        <div>
          <Field
            name="rating"
            disabled={!initialized}
            component={TextField}
            hintText={intl.formatMessage({id: 'rating'})}
            floatingLabelText={intl.formatMessage({id: 'rating'})}
            ref="rating"
            withRef
          />
        </div>

        <ImageCropDialog
          path={`edibles/${uid}`}
          fileName={`photoURL`}
          onUploadSuccess={(s) => {
            this.handlePhotoUploadSuccess(s)
          }}
          open={dialogs.new_edible_photo !== undefined}
          src={dialogs.new_edible_photo}
          handleClose={() => {
            setDialogIsOpen('new_edible_photo', undefined)
          }}
          title={intl.formatMessage({id: 'change_photo'})}
        />
      </div>

      </form>
    );
  }
}

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  initialized: PropTypes.bool.isRequired,
  setDialogIsOpen: PropTypes.func.isRequired,
  dialogs: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};


Form = reduxForm({form: 'edible'})(Form);
const selector = formValueSelector('edible')

const mapStateToProps = state => {
  const { intl, vehicleTypes, users, dialogs } = state;

  return {
    intl,
    vehicleTypes,
    users,
    dialogs,
    photoURL: selector(state, 'photoURL')
  };
};

export default connect(
  mapStateToProps, { setDialogIsOpen }
)(injectIntl(withRouter(muiThemeable()(Form))));