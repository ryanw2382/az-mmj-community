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

class Flowers extends Component {

  componentDidMount() {
    const { watchList, firebaseApp}=this.props;

    let ref=firebaseApp.database().ref('flowers').limitToFirst(20);

    watchList(ref);
  }

  renderList(flowers) {
    const {history} =this.props;

    if(flowers===undefined){
      return <div>No Flowers to display</div>
    }

    return flowers.map((flower, index) => {

      return <div key={index}>
        <ListItem
          leftAvatar={
            <Avatar
              src={flower.val.photoURL}
              alt="business"
              icon={
                <FontIcon className="material-icons">
                  business
                </FontIcon>
              }
            />
          }
          key={index}
          primaryText={flower.val.name}
          secondaryText={flower.val.class}
          onClick={()=>{history.push(`/flowers/edit/${flower.key}`)}}
          id={index}
        />
        <Divider inset={true}/>
      </div>
    });
  }


  render(){
    const { intl, flowers, muiTheme, history, isGranted } =this.props;

    return (
      <Activity
        isLoading={flowers===undefined}
        containerStyle={{overflow:'hidden'}}
        title={intl.formatMessage({id: 'flowers'})}>

        <Scrollbar>

          <div style={{overflow: 'none', backgroundColor: muiTheme.palette.canvasColor}}>
            <List  id='test' style={{height: '100%'}} ref={(field) => { this.list = field; }}>
              {this.renderList(flowers)}
            </List>
          </div>

          <div style={{position: 'fixed', right: 18, zIndex:3, bottom: 18, }}>
            {
              isGranted('create_flower') &&
              <FloatingActionButton secondary={true} onClick={()=>{history.push(`/flowers/create`)}} style={{zIndex:3}}>
                <FontIcon className="material-icons" >add</FontIcon>
              </FloatingActionButton>
            }
          </div>
        </Scrollbar>
      </Activity>
    );

  }

}

Flowers.propTypes = {
  flowers: PropTypes.array,
  history: PropTypes.object,
  isGranted: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { auth, browser, lists } = state;

  return {
    flowers: lists.flowers,
    auth,
    browser,
    isGranted: grant=>isGranted(state, grant)
  };
};


export default connect(
  mapStateToProps,
)(injectIntl(muiThemeable()(withRouter(withFirebase(Flowers)))));