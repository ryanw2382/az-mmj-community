const functions = require('firebase-functions');
const admin = require('firebase-admin');
try {admin.initializeApp(functions.config().firebase);} catch(e) {} // You do that because the admin SDK can only be initialized once.
const { setCannabisReportsKey, Flower } = require('cannabis-reports')
setCannabisReportsKey('9687a012203c12f7556d4a87b1b05294d49ebeb9')

exports.getFlower = functions.https.onRequest((req, res) => {


  return Flower
    .all(options)
    .then(data =>
      admin.collection('flowers').document('{ucpc}')
      .add(data))
    .catch(err => console.log(err))

});
