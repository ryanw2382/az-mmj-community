import React, {Component} from 'react';
import { Activity } from '../../containers/Activity';
import {Card, CardTitle, CardText} from 'material-ui/Card';



class ContactUs extends Component {
  render() {

  return(
      <Activity title='Contact Us'>
    <div>
      <Card>


        <CardTitle title="We'd Love To Hear From You!!" subtitle="Yes you!!" />
        <CardText>
          Hey everyone thank you for visting our site! We're always open to ideas and suggestions
          you can reach us at az.mmj.contact@gmail.com. You guys and gals are awesome keep doing
          what you're doing!
        </CardText>

      </Card>
    </div>
      </Activity>

  )
  }
}

export default ContactUs