const functions = require('firebase-functions');
const admin = require('firebase-admin');
try {admin.initializeApp(functions.config().firebase);} catch(e) {} // You do that because the admin SDK can only be initialized once.
const nodemailer = require('nodemailer')
const gmailEmail = encodeURIComponent(functions.config().gmail.email)
const gmailPassword = encodeURIComponent(functions.config().gmail.password)
const mailTransport = nodemailer.createTransport(`smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`)

exports = module.exports = functions.auth.user().onDelete(event => {
  const user = event.data
  const uid = user.uid
  const email = user.email
  const displayName = user.displayName

  const mailOptions = {
    from: '"Arizona Cannabis Community" <az.mmj.contact@gmail.com>',
    to: email
  }

  mailOptions.subject = `Bye! Sorry to see you go`
  mailOptions.text = `Hi ${displayName}, This email is to confirm that we have deleted your Arizona Cannabis Community App account.  If you would like to use the app again in the future, feel free to visit us and create a new account.`

  const sendEmail = mailTransport.sendMail(mailOptions).then(() => {
    console.log('Account deletion confirmation email sent to:', email)
  })

  const deleteUser = admin.database().ref(`/users/${uid}`).remove()

  return Promise.all([sendEmail, deleteUser]).then(results => {
    console.log(results);
  })

})