import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { change, submit } from 'redux-form';
import { withFirebase } from 'firekit-provider'
import { Field, reduxForm } from 'redux-form'
import { Activity } from '../../containers/Activity';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import { Form } from 'redux-form';
import EmailForm  from '../../components/Forms/EmailForm'
import { TextField } from 'redux-form-material-ui';

const path='/contact-us/'

class ContactUs extends Component {
  render() {
    const {
      history,
      intl,
      match,
      submit,
      muiTheme,
      firebaseApp
    }=this.props;
    const uid=match.params.uid

  return(
      <Activity title={intl.formatMessage({id: 'contact_us'})}>
        <div>
        <Card
          style={{
          height: '100%',
          alignItems: 'strech',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>


        <CardTitle title="We'd Love To Hear From You!!" subtitle="Yes you!!" />
        <CardText>
        Hey everyone thank you for visting our site! We're always open to ideas and suggestions
        you can reach us in the form below. You guys and gals are awesome keep doing
        what you're doing!
        </CardText>

        </Card>
      </div>
        <div>


           <EmailForm />

        </div>
      </Activity>

  )
  }
}

ContactUs.propTypes={
  history: PropTypes.object,
  intl: intlShape.isRequired,
  match: PropTypes.object.isRequired,
  submit: PropTypes.func.isRequired,
  muiTheme: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  const { intl } = state;

  return {
    intl
  };
};

export default connect(
    mapStateToProps, { submit }
)(injectIntl(withFirebase(muiThemeable()(ContactUs))));
