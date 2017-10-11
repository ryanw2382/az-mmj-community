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

class Dispensaries extends Component {

  componentDidMount() {
    const { watchList, firebaseApp}=this.props;

    let ref=firebaseApp.database().ref('dispensaries').limitToFirst(20);

    watchList(ref);
  }

  renderList(dispensaries) {
    const {history} =this.props;

    if(dispensaries===undefined){
      return <div>No Dispensaries to display</div>
    }

    return dispensaries.map((dispensary, index) => {

      return <div key={index}>
        <ListItem
            leftAvatar={
              <Avatar
                  src={dispensary.val.photoURL}
                  alt="business"
                  icon={
                    <FontIcon className="material-icons">
                      business
                    </FontIcon>
                  }
              />
            }
            key={index}
            primaryText={dispensary.val.name}
            secondaryText={dispensary.val.full_name}
            onClick={()=>{history.push(`/dispensaries/edit/${dispensary.key}`)}}
            id={index}
        />
        <Divider inset={true}/>
      </div>
    });
  }


  render(){
    const { intl, dispensaries, muiTheme, history, isGranted } =this.props;

    return (
        <Activity
            isLoading={dispensaries===undefined}
            containerStyle={{overflow:'hidden'}}
            title={intl.formatMessage({id: 'dispensaries'})}>

          <div id="scroller" style={{overflow: 'auto', height: '100%'}}>

            <div style={{overflow: 'none', backgroundColor: muiTheme.palette.canvasColor}}>
              <List  id='test' style={{height: '100%'}} ref={(field) => { this.list = field; }}>
                {this.renderList(dispensaries)}
              </List>
            </div>

            <div style={{position: 'fixed', right: 18, zIndex:3, bottom: 18, }}>
              {
                isGranted('create_dispensary') &&
                <FloatingActionButton secondary={true} onClick={()=>{history.push(`/dispensaries/create`)}} style={{zIndex:3}}>
                  <FontIcon className="material-icons" >add</FontIcon>
                </FloatingActionButton>
              }
            </div>
          </div>
        </Activity>
    );

  }

}

Dispensaries.propTypes = {
  dispensaries: PropTypes.array,
  history: PropTypes.object,
  isGranted: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { auth, browser, lists } = state;

  return {
    dispensaries: lists.dispensaries,
    auth,
    browser,
    isGranted: grant=>isGranted(state, grant)
  };
};


export default connect(
    mapStateToProps,
)(injectIntl(muiThemeable()(withRouter(withFirebase(Dispensaries)))));
