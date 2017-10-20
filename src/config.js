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
    'google.com',
    'facebook.com',
    'twitter.com',
    'github.com',
    'password'
  ],
  initial_state: {
    theme: 'dark',
    locale: 'en'
  },
  drawer_width: 256
}

export default config