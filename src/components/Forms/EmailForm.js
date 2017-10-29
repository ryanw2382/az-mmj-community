import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form'
import { TextField } from "redux-form-material-ui";
import RaisedButton from 'material-ui/RaisedButton';

// TODO: consider changing the name of this class and file to more accurately represent what it is.  i.e. ContactUsForm
class EmailForm extends Component{

  render(){

    return(
        <form

          action="https://formspree.io/az.mmj.contact@gmail.com"
          method="POST"
          value="Submitting"
          style={{
          height: '100%',
          alignItems: 'stretch',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>



          <div style={{margin: 15, display: 'flex', flexDirection: 'column'}}>
          <div>
          <Field
              name="name"
              component={TextField}
              floatingLabelText="Name"
          />
          </div>
          <div>
          <Field
            name="email"
            component={TextField}
            floatingLabelText="Email"
        />
          </div>
          <div>
          <Field
              name="content"
              component={TextField}
              floatingLabelText="Message"
              multiLine={true}
              rows={2}
              rowsMax={4}
          />
          </div>
          <div>
              <RaisedButton name="submit" type="submit" label="submit" primary={true} />
          </div>
            </div>
        </form>
    )

  }

}

export default reduxForm({form: 'email_form'})(EmailForm)

