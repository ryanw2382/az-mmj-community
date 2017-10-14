import React, {Component} from 'react'
import { Activity } from '../../containers/Activity'

class DispensaryMap extends Component {
      render(){

        return(
            <Activity title="Dispensary Map">
              <div className="google-maps">
                <iframe title="Dispensary Map" src="https://www.google.com/maps/d/u/0/embed?mid=1bHhT2nZ6EkRParxJSGN3ULfYr-o" width="600" height="450" />
              </div>
            </Activity>

          )

  }
}


export default DispensaryMap
