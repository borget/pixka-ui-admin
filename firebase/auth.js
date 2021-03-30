import firebase from 'firebase/app';
import 'firebase/auth';

export const signup = async ({ userName, email, password}) => {
    const resp = await firebase.auth().createUserWithEmailAndPassword(email, password);
    const user = resp.user;
    await user.updateProfile({displayName: `${userName}`});
    return user;
}

export const signOut = () => {
    return firebase.auth().signOut();
}