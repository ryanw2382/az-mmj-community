import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Activity } from '../../containers/Activity';
import { withFirebase } from 'firekit-provider';
import { connect } from 'react-redux'
import {List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import {withRouter} from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
import muiThemeable from 'material-ui/styles/muiThemeable';
// eslint-disable-next-line
import firestore from 'firebase/firestore';


class Flowers extends Component {

  componentDidMount() {
    this.handleWatch()
  }

  componentWillUnmount() {
    this.handleUnwatch()
  }

  handleWatch = () => {
    const { watchCol }= this.props

    watchCol('flowers')
  }

  handleUnwatch = () => {
    const { unwatchCol } = this.props

    unwatchCol('flowers')
  }

  renderList = () => {
    const {history, flowers} = this.props;

    if (flowers === undefined) {
      return <div>Nothing Here!</div>
    }

    return flowers.map((flower, ucpc) => {

      return <div key={ucpc}>
        <ListItem
          leftAvatar={
            <Avatar
              src={flowers.val.image}
              alt={flowers.val.name}
              icon={
                <FontIcon className="material-icons">
                  store
                </FontIcon>
              }
            />
          }
          key={ucpc}
          primaryText={flowers.val.name}
          secondaryText={flowers.val.ucpc}
          onClick={() => { history.push(`/flowers/${flowers.ucpc}`)
          }}
          id={ucpc}
        />
        <Divider inset={true}/>
      </div>
    });
  }


  render() {
    const { intl, flowers, muiTheme } = this.props;


    return (
      <Activity
        isLoading={flowers === undefined}
        containerStyle={{overflow:'hidden'}}
        title={intl.formatMessage({id: 'flowers'})}>

      <div id="scroller" style={{overflow: 'auto', height: '100%'}}>

        <div style={{overflow: 'none', backgroundColor: muiTheme.palette.canvasColor}}>

          <List id="test" style={{height: '100%'}}
                ref={(field) => { this.list = field; }}>
            {this.renderList(flowers)}
          </List>

        </div>
      </div>
      </Activity>
    );
  }
}

Flowers.propTypes = {
  flowers: PropTypes.array,
  history: PropTypes.object,

}
const mapStateToProps = (state) => {
  const { auth, browser, lists } = state;

  return {
    flowers: lists.flowers,
    auth,
    browser
  };
};

export default connect(
  mapStateToProps
)(injectIntl(muiThemeable()(withRouter(withFirebase(Flowers)))));