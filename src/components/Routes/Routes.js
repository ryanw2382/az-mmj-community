import React from 'react';
import Loadable from 'react-loadable';
import LoadingComponent   from '../../components/LoadingComponent/LoadingComponent';
import { RestrictedRoute }   from '../../containers/RestrictedRoute';
import { Route, Switch } from 'react-router-dom';
import FirebaseProvider from 'firekit-provider';

function MyLoadable(opts, preloadComponents) {


  return Loadable.Map({
    loader: {
      Component: opts.loader,
      firebase: () => import('../../firebase'),
      NotificationLayout: () => import('../../containers/NotificationLayout/NotificationLayout'),
    },
    loading: LoadingComponent,
    render(loaded, props) {

      if (preloadComponents !== undefined &&
        preloadComponents instanceof Array) {
        preloadComponents.map(component => component.preload());
      }

      const Component = loaded.Component.default;
      const NotificationLayout = loaded.NotificationLayout.default
      const firebaseApp = loaded.firebase.firebaseApp;

      return <FirebaseProvider firebaseApp={firebaseApp}>
        <div>
          <Component {...props} />
          <NotificationLayout/>
        </div>
      </FirebaseProvider>;
    }
  });

}

const AsyncDashboard = MyLoadable({loader: () => import('../../containers/Dashboard/Dashboard')});

const AsyncAbout = MyLoadable({loader: () => import('../../containers/About/About')});

const AsyncPublicChats = MyLoadable({loader: () => import('../../containers/PublicChats/PublicChats')});

const AsyncMyAccount = MyLoadable({loader: () => import('../../containers/MyAccount/MyAccount')});

const AsyncPredefinedChatMessages = MyLoadable({loader: () => import('../../containers/PredefinedChatMessages/PredefinedChatMessages')});


const AsyncTask = MyLoadable({loader: () => import('../../containers/Tasks/Task')});
const AsyncTasks = MyLoadable({loader: () => import('../../containers/Tasks/Tasks')}, [AsyncTask]);

const AsyncRole = MyLoadable({loader: () => import('../../containers/Roles/Role')});
const AsyncRoles = MyLoadable({loader: () => import('../../containers/Roles/Roles')}, AsyncRole);

const AsyncChat = MyLoadable({loader: () => import('../../containers/Chats/Chat')});
const AsyncCreateChat = MyLoadable({loader: () => import('../../containers/Chats/CreateChat')});
const AsyncChats = MyLoadable({loader: () => import('../../containers/Chats/Chats')}, [AsyncChat, AsyncCreateChat]);

const AsyncDispensary = MyLoadable({loader: () => import('../../containers/Dispensaries/Dispensary')});
const AsyncDispensaries = MyLoadable({loader: () => import('../../containers/Dispensaries/Dispensaries')}, [AsyncDispensary]);
const AsyncDispensaryMap = MyLoadable({loader: () => import('../../containers/Dispensaries/DispensaryMap')});

const AsyncFlowers = MyLoadable({loader: () => import('../../containers/Flowers/Flowers')});

const AsyncEdibles = MyLoadable({loader: () => import('../../containers/Edibles/Edibles')});

const AsyncExtracts = MyLoadable({loader: () => import('../../containers/Extracts/Extracts')});

const AsyncContactUs = MyLoadable({loader: () => import('../../containers/ContactUs/ContactUs')});

const AsyncUser = MyLoadable({loader: () => import('../../containers/Users/User')});
const AsyncUsers = MyLoadable({loader: () => import('../../containers/Users/Users')}, [AsyncUser]);

const AsyncSignIn = MyLoadable({loader: () => import('../../containers/SignIn/SignIn')});

const AsyncPageNotFound = MyLoadable({loader: () => import('../../components/PageNotFound/PageNotFound')});

const Routes = (props, context) => {

  return (
    <Switch >
      <RestrictedRoute type='private' path="/" exact component={AsyncDispensaryMap} />

      <RestrictedRoute type='private' path="/dashboard" exact component={AsyncDashboard} />

      <RestrictedRoute type='private' path="/loading" exact component={LoadingComponent} />

      <RestrictedRoute type='private' path="/public-chats" exact component={AsyncPublicChats} />

      <RestrictedRoute type='private' path="/tasks" exact component={AsyncTasks} />
      <RestrictedRoute type='private' path="/tasks/edit/:uid" exact component={AsyncTask} />
      <RestrictedRoute type='private' path="/tasks/create" exact component={AsyncTask} />

      <RestrictedRoute type='private' path="/roles" exact component={AsyncRoles} />
      <RestrictedRoute type='private' path="/roles/edit/:uid" exact component={AsyncRole} />
      <RestrictedRoute type='private' path="/roles/create" exact component={AsyncRole} />

      <RestrictedRoute type='private' path="/dispensaries" exact component={AsyncDispensaries} />
      <RestrictedRoute type='private' path="/dispensaries/edit/:uid" exact component={AsyncDispensary} />
      <RestrictedRoute type='private' path="/dispensaries/create" exact component={AsyncDispensary} />
      <RestrictedRoute type='private' path="/dispensary-map" exact component={AsyncDispensaryMap} />

      <RestrictedRoute type='private' path="/predefined-chat-messages" exact component={AsyncPredefinedChatMessages} />

      <RestrictedRoute type='private' path="/chats" exact component={AsyncChats} />
      <RestrictedRoute type='private' path="/chats/edit/:uid" exact component={AsyncChat} />
      <RestrictedRoute type='private' path="/chats/create" exact component={AsyncCreateChat} />

      <RestrictedRoute type='private' path="/users" exact component={AsyncUsers} />
      <RestrictedRoute type='private' path="/users/edit/:uid/:editType" exact component={AsyncUser} />

      <RestrictedRoute type='private' path="/flowers" exact component={AsyncFlowers} />

      <RestrictedRoute type='private' path="/edibles" exact component={AsyncEdibles} />

      <RestrictedRoute type='private' path="/extracts" exact component={AsyncExtracts} />

      <RestrictedRoute type='private' path="/contact-us" exact component={AsyncContactUs} />

      <RestrictedRoute type='private' path="/about" exact component={AsyncAbout}  />

      <RestrictedRoute type='private' path="/my-account"  exact component={AsyncMyAccount} />

      <RestrictedRoute type='public' path="/signin" component={AsyncSignIn} />

      <Route component={AsyncPageNotFound} />

    </Switch>

  );
}

export default Routes