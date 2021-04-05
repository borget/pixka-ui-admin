import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/storage';

if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: process.env.api_key,
        authDomain: process.env.auth_domain,
        projectId: process.env.project_id,
        storageBucket: process.env.storage_bucket,
        messagingSenderId: process.env.messaging_sender_id,
        appId: process.env.app_id
    });
}else {
    firebase.app(); // if already initialized, use that one
}

export const firestore = firebase.firestore();
export const storage = firebase.storage();