import React, { Component } from 'react';
// import { injectIntl, intlShape } from 'react-intl';
// import { Activity } from '../../containers/Activity';
import { withFirebase } from 'firekit-provider';

class Flower extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: null,
      ucpc: null,
      link: null,
      qr: null,
      barcode: null,
      url: null,
      image: null,
      producer: {
        name: null,
        ucpc: null,
        link: null,
      },
      type: null,
      strain: {
        name: null,
        ucpc: null,
        link: null,
      },
      labTest: null,
      thc: null,
      cdb: null,
      reviews: {
        count: null,
        link: null,
      },
      createdAt: {
        datetime: null,
        timezone: null,
      },
      updatedAt: {
        datetime: null,
        timezone: null,
      }
    }
  }

    componentDidMount() {
    const { watchDoc } = this.props;
    watchDoc('{ucpc}');
  }

  componentWillUnmount() {
    const { unwatchDoc } = this.props;
    unwatchDoc('{ucpc}');
  }





  render() {
    const { isConnected } = this.props;


    return (
      <div>
        {this.renderList}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { lists } = state;
  return {
    flowers: lists.flowers
  };
};

export default connect(
  mapStateToProps
)(withFirebase(Flower))