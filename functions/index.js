const functions = require("firebase-functions");
const nodemailer = require("nodemailer");

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;

const mailTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

/**
 * Sends welcome email.
 * @param {string} email - The email recipient.
 * @return {null}.
 */
async function sendWelcomeEmail(email) {
  const mailOptions = {
    from: "Notificación <alberto.vazq.rmz@gmail.com>",
    to: email,
    subject: "Esto es una notificación de correo electrónico",
    text: `Hola ${email}! esto es un texto`,
  };
  await mailTransport.sendEmail(mailOptions);
  console.log("Email de bienvenida enviado a: ", email);
  return null;
}

exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
  const email = user.email;
  return sendWelcomeEmail(email);
});
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
