import firebase from 'firebase'

const config= {
  firebase_config: {
    apiKey: "AIzaSyAlJEu6KpoAV3EyIYJW1Gh8WpDwPUGepBc",
    authDomain: "az-mmj-community.firebaseapp.com",
    databaseURL: "https://az-mmj-community.firebaseio.com",
    projectId: "az-mmj-community",
    storageBucket: "az-mmj-community.appspot.com",
    messagingSenderId: "909985495567"
  },
  firebase_config_dev: {
    apiKey: "AIzaSyAlJEu6KpoAV3EyIYJW1Gh8WpDwPUGepBc",
    authDomain: "az-mmj-community.firebaseapp.com",
    databaseURL: "https://az-mmj-community.firebaseio.com",
    projectId: "az-mmj-community",
    storageBucket: "az-mmj-community.appspot.com",
    messagingSenderId: "909985495567"
  },
  firebase_providers: [
    firebase.auth.GoogleAuthProvider,
    firebase.auth.FacebookAuthProvider,
    firebase.auth.TwitterAuthProvider,
    firebase.auth.GithubAuthProvider,
    firebase.auth.EmailAuthProvider,
  ],
  initial_state: {
    theme: 'dark',
    locale: 'en'
  },
  drawer_width: 256
}

export default config