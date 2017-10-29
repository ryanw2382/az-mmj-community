import React, {Component} from 'react';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { submit } from 'redux-form';
import { withFirebase } from 'firekit-provider'
import { Activity } from '../../containers/Activity';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import EmailForm  from '../../components/Forms/EmailForm'


class ContactUs extends Component {
  render() {
    const {
      intl
    }=this.props;

  return(
      <Activity title={intl.formatMessage({id: 'contact_us'})}>
        <div>
        <Card
          style={{
          height: '100%',
          alignItems: 'stretch',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>


        <CardTitle title="We'd Love To Hear From You!!" subtitle="Yes you!!" />
        <CardText>
        Hey everyone thank you for visiting our site! We're always open to ideas and suggestions
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
  intl: intlShape.isRequired
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
