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


// TODO: Look into changing the main class name as it might cause some issues further on. instead of calling it FlowerForm.
class Form extends Component {

  handlePhotoUploadSuccess = (snapshot) =>{
    const { setDialogIsOpen, change}=this.props;
    change('photoURL', snapshot.downloadURL);
    setDialogIsOpen('new_flower_photo', undefined);
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
    // TODO: change each label to more accurately and descriptively refer to each individual component; e.g. "name" should be "flower_name"

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
                  local_florist
                </FontIcon>
              }
              ref="photoURL"
              withRef
            />
          </div>


          <FlatButton
            onClick={()=>{
              setDialogIsOpen('new_flower_photo', true)
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
              name="class"
              disabled={!initialized}
              component={TextField}
              hintText={intl.formatMessage({id: 'flower_type_hint'})}
              floatingLabelText={intl.formatMessage({id: 'flower_type_label'})}
              ref="flower_type"
              withRef
            />
          </div>

          <div>
            <Field
              name="summary"
              disabled={!initialized}
              component={TextField}
              hintText={intl.formatMessage({id: 'summary'})}
              floatingLabelText={intl.formatMessage({id: 'summary'})}
              ref="summary"
              withRef
            />
          </div>

          <div>
            <Field
              name="positive_effects"
              disabled={!initialized}
              component={TextField}
              hintText={intl.formatMessage({id: 'positive_effects'})}
              floatingLabelText={intl.formatMessage({id: 'positive_effects'})}
              ref="positive_effects"
              withRef
            />
          </div>

          <div>
            <Field
              name="negative_effects"
              disabled={!initialized}
              component={TextField}
              hintText={intl.formatMessage({id: 'negative_effects'})}
              floatingLabelText={intl.formatMessage({id: 'negative_effects'})}
              ref="negative_effects"
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
            path={`flowers/${uid}`}
            fileName={`photoURL`}
            onUploadSuccess={(s)=>{this.handlePhotoUploadSuccess(s) }}
            open={dialogs.new_flower_photo!==undefined}
            src={dialogs.new_flower_photo}
            handleClose={()=>{setDialogIsOpen('new_flower_photo',undefined)}}
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


Form = reduxForm({form: 'flower'})(Form);
const selector = formValueSelector('flower')

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