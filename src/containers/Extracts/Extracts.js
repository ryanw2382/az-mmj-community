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

class Extracts extends Component {

  componentDidMount() {
    const { watchList, firebaseApp}=this.props;

    let ref=firebaseApp.database().ref('extracts').limitToFirst(20);

    watchList(ref);
  }

  renderList(extracts) {
    const {history} =this.props;

    if(extracts===undefined){
      return <div>No Extracts to display</div>
    }

    return extracts.map((extract, index) => {

      return <div key={index}>
        <ListItem
          leftAvatar={
            <Avatar
              src={extract.val.photoURL}
              alt="business"
              icon={
                <FontIcon className="material-icons">
                  business
                </FontIcon>
              }
            />
          }
          key={index}
          primaryText={extract.val.product}
          secondaryText={extract.val.city}
          onClick={()=>{history.push(`/extracts/edit/${extract.key}`)}}
          id={index}
        />
        <Divider inset={true}/>
      </div>
    });
  }


  render(){
    const { intl, extracts, muiTheme, history, isGranted } =this.props;

    return (
      <Activity
        isLoading={extracts===undefined}
        containerStyle={{overflow:'hidden'}}
        title={intl.formatMessage({id: 'extracts'})}>

        <Scrollbar>

          <div style={{overflow: 'none', backgroundColor: muiTheme.palette.canvasColor}}>
            <List  id='test' style={{height: '100%'}} ref={(field) => { this.list = field; }}>
              {this.renderList(extracts)}
            </List>
          </div>

          <div style={{position: 'fixed', right: 18, zIndex:3, bottom: 18, }}>
            {
              isGranted('create_extract') &&
              <FloatingActionButton secondary={true} onClick={()=>{history.push(`/extracts/create`)}} style={{zIndex:3}}>
                <FontIcon className="material-icons" >add</FontIcon>
              </FloatingActionButton>
            }
          </div>
        </Scrollbar>
      </Activity>
    );

  }

}

Extracts.propTypes = {
  extracts: PropTypes.array,
  history: PropTypes.object,
  isGranted: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { auth, browser, lists } = state;

  return {
    extracts: lists.extracts,
    auth,
    browser,
    isGranted: grant=>isGranted(state, grant)
  };
};


export default connect(
  mapStateToProps,
)(injectIntl(muiThemeable()(withRouter(withFirebase(Extracts)))));