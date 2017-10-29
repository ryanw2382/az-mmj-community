import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { Activity } from '../../containers/Activity';
import { ResponsiveMenu } from 'material-ui-responsive-menu';
import { setDialogIsOpen } from '../../store/dialogs/actions';
import EdibleForm from '../../components/Forms/EdibleForm';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import { withFirebase } from 'firekit-provider'
import FireForm from 'fireform'
import { change, submit } from 'redux-form';
import isGranted  from '../../utils/auth';


const path='/edibles/';
const form_name='edible';


class Edible extends Component {

  validate = (values) => {
    const { intl } = this.props;
    const errors = {}

    errors.name = !values.name?intl.formatMessage({id: 'error_required_field'}):'';
/*    errors.state = !values.state?intl.formatMessage({id: 'error_required_field'}):'';
    errors.city = !values.city?intl.formatMessage({id: 'error_required_field'}):'';*/

    return errors
  }

  handleUpdateValues = (values) => {

    return {
      updated: firebase.database.ServerValue.TIMESTAMP ,
      ...values
    }
  }

  handleClose = () => {
    const { setDialogIsOpen }=this.props;

    setDialogIsOpen('delete_edible', false);

  }

  handleDelete = () => {

    const {history, match, firebaseApp}=this.props;
    const uid=match.params.uid;

    if(uid){
      firebaseApp.database().ref().child(`${path}${uid}`).remove().then(()=>{
        this.handleClose();
        history.goBack();
      })
    }
  }


  render() {

    const {
      history,
      intl,
      setDialogIsOpen,
      dialogs,
      match,
      submit,
      muiTheme,
      isGranted,
      firebaseApp
    }=this.props;

    const uid=match.params.uid;


    const actions = [
      <FlatButton
        label={intl.formatMessage({id: 'cancel'})}
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label={intl.formatMessage({id: 'delete'})}
        secondary={true}
        onClick={this.handleDelete}
      />,
    ];

    const menuList=[
      {
        hidden: (uid===undefined && !isGranted(`create_${form_name}`)) || (uid!==undefined && !isGranted(`edit_${form_name}`)),
        text: intl.formatMessage({id: 'save'}),
        icon: <FontIcon className="material-icons" color={muiTheme.palette.canvasColor}>save</FontIcon>,
        tooltip:intl.formatMessage({id: 'save'}),
        onClick: ()=>{submit('edible')}
      },
      {
        hidden: uid===undefined || !isGranted(`delete_${form_name}`),
        text: intl.formatMessage({id: 'delete'}),
        icon: <FontIcon className="material-icons" color={muiTheme.palette.canvasColor}>delete</FontIcon>,
        tooltip: intl.formatMessage({id: 'delete'}),
        onClick: ()=>{setDialogIsOpen('delete_edible', true);}
      }
    ]

    return (
      <Activity
        iconStyleRight={{width:'50%'}}
        iconElementRight={
          <div>
            <ResponsiveMenu
              iconMenuColor={muiTheme.palette.canvasColor}
              menuList={menuList}
            />
          </div>
        }

        onBackClick={()=>{history.goBack()}}
        title={intl.formatMessage({id: match.params.uid?'edit_edible':'create_edible'})}>

        <div style={{margin: 15, display: 'flex'}}>

          <FireForm
            firebaseApp={firebaseApp}
            name={'edible'}
            path={`${path}`}
            validate={this.validate}
            onSubmitSuccess={(values)=>{history.push('/edibles');}}
            onDelete={(values)=>{history.push('/edibles');}}
            uid={match.params.uid}>
            <EdibleForm />
          </FireForm>
        </div>
        <Dialog
          title={intl.formatMessage({id: 'delete_edible_title'})}
          actions={actions}
          modal={false}
          open={dialogs.delete_edible===true}
          onRequestClose={this.handleClose}>
          {intl.formatMessage({id: 'delete_edible_message'})}
        </Dialog>

      </Activity>
    );
  }
}

Edible.propTypes = {
  history: PropTypes.object,
  intl: intlShape.isRequired,
  setDialogIsOpen: PropTypes.func.isRequired,
  dialogs: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  submit: PropTypes.func.isRequired,
  muiTheme: PropTypes.object.isRequired,
  isGranted: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => {
  const { intl, dialogs } = state;

  return {
    intl,
    dialogs,
    isGranted: grant=>isGranted(state, grant)
  };
};

export default connect(
  mapStateToProps, {setDialogIsOpen, change, submit}
)(injectIntl(withRouter(withFirebase(muiThemeable()(Edible)))));