
var admin = require("firebase-admin");

var serviceAccount = require("./pixka-design-admin-firebase-adminsdk-7vda5-b4654fa837.json");

var uid = process.argv[2];

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

admin.auth().setCustomUserClaims(uid, {admin: true})
    .then(()=>{
        console.log('custom claims set for user', uid);
        process.exit();
    })
    .catch(error => {
        console.log(error);
        process.exit(1);
    })
