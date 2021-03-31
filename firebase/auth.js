import firebase from 'firebase/app';
import 'firebase/auth';
import {createUserDocument} from "./user";

export const signup = async ({ userName, email, password}) => {
    const resp = await firebase.auth().createUserWithEmailAndPassword(email, password);
    const user = resp.user;
    await user.updateProfile({displayName: `${userName}`});
    await createUserDocument(user);
    return user;
}

export const signin = async ({ email, password}) => {
    const resp = await firebase.auth().signInWithEmailAndPassword(email, password);
    const user = resp.user;
    return user;
}

export const signOut = () => {
    return firebase.auth().signOut();
}