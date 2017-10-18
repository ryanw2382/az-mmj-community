const functions = require('firebase-functions');
const admin = require('firebase-admin');
try {admin.initializeApp(functions.config().firebase);} catch(e) {} // You do that because the admin SDK can only be initialized once.
const { setCannabisReportsKey, Flower } = require('cannabis-reports')
setCannabisReportsKey('9687a012203c12f7556d4a87b1b05294d49ebeb9')

exports = module.exports = functions.https.onRequest((req, res) => {

  const options = {
    sort: '-updatedAt',
    page: '1'
  }


  Flower
    .all(options)
    .then(data => admin.collection('flowers').document('{ucpc}').set(data))
    .catch(err => console.log(err))

});
