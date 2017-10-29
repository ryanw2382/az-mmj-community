import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { injectIntl } from 'react-intl';
import { Activity } from '../../containers/Activity';
import {List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import {withRouter} from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
import { withFirebase } from 'firekit-provider'
import isGranted  from '../../utils/auth';
import Scrollbar from '../../components/Scrollbar/Scrollbar';

class Edibles extends Component {

  componentDidMount() {
    const { watchList, firebaseApp}=this.props;

    let ref=firebaseApp.database().ref('edibles').limitToFirst(20);

    watchList(ref);
  }

  renderList(edibles) {
    const {history} =this.props;

    if(edibles===undefined){
      return <div>No Edibles to display</div>
    }

    return edibles.map((edible, index) => {

      return <div key={index}>
        <ListItem
          leftAvatar={
            <Avatar
              src={edible.val.photoURL}
              alt="edibles"
              icon={
                <FontIcon className="material-icons">
                  cake
                </FontIcon>
              }
            />
          }
          key={index}
          primaryText={edible.val.name}
          secondaryText={edible.val.ingredients}
          onClick={()=>{history.push(`/edibles/edit/${edible.key}`)}}
          id={index}
        />
        <Divider inset={true}/>
      </div>
    });
  }


  render(){
    const { intl, edibles, muiTheme, history, isGranted } =this.props;

    return (
      <Activity
        isLoading={edibles===undefined}
        containerStyle={{overflow:'hidden'}}
        title={intl.formatMessage({id: 'edibles'})}>

        <Scrollbar>

          <div style={{overflow: 'none', backgroundColor: muiTheme.palette.canvasColor}}>
            <List  id='test' style={{height: '100%'}} ref={(field) => { this.list = field; }}>
              {this.renderList(edibles)}
            </List>
          </div>

          <div style={{position: 'fixed', right: 18, zIndex:3, bottom: 18, }}>
              {
                isGranted('create_edible') &&
              <FloatingActionButton secondary={true} onClick={()=>{history.push(`/edibles/create`)}} style={{zIndex:3}}>
              <FontIcon className="material-icons" >add</FontIcon>
              </FloatingActionButton>
              }
          </div>
        </Scrollbar>
      </Activity>
    );

  }

}

Edibles.propTypes = {
  edibles: PropTypes.array,
  history: PropTypes.object,
  isGranted: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { auth, browser, lists } = state;

  return {
    edibles: lists.edibles,
    auth,
    browser,
    isGranted: grant=>isGranted(state, grant)
  };
};


export default connect(
  mapStateToProps,
)(injectIntl(muiThemeable()(withRouter(withFirebase(Edibles)))));