import React, {Component} from 'react';
import { Activity } from '../../containers/Activity';
import { injectIntl, intlShape } from 'react-intl'

export default class DispensaryMap extends Component {
      render(){
        const intl = this.props;

        return(
            <Activity>
            <div>
              <iframe title="DispensaryMap" src="https://www.google.com/maps/d/u/0/embed?mid=1pZJYwuCYisJc_SNS9wZUbjZ4zRU" width="99.5%" height="675" />
            </div>
            </Activity>

          )

  }
}

DispensaryMap.propTypes={
  intl: intlShape.isRequired
}