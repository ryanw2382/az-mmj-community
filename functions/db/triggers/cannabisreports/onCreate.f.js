const functions = require('firebase-functions')
const admin = require('firebase-admin')
const rp = require('request-promise')
try { admin.initializeApp(functions.config().firebase) } catch (e) {} // You do that because the admin SDK can only be initialized once.

const host = `https://www.cannabisreports.com/api/v1.0`

exports = module.exports = functions.database.ref('triggers/cannabisreports/{uid}').onCreate(event => {
  const eventSnapshot = event.data
  const eventData = eventSnapshot.val()
  let requestPath = eventData.path

  // Remove this for real test
  requestPath = `strains/VUJCJ4TYMG000000000000000`

  const options = {
    uri: `${host}/${requestPath}`,
    qs: {
      // access_token: 'xxxxx xxxxx' // -> uri + '?access_token=xxxxx%20xxxxx'
    },
    headers: {
      // 'User-Agent': 'Request-Promise'
    },
    json: true
  }

  return eventSnapshot.adminRef.remove().then(() => {
    return rp(options).then(body => {
      return admin.database().ref('responseData').set(body)
    })
  })
})
