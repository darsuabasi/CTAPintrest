import firebase from '../firebase';

// export const forgetPassword = (email, actionCode) => firebase.auth().applyActionCode.sendPasswordResetEmail(email, actionCode);

// export const confirmPasswordReset = (code, newPassword) => firebase.auth().checkActionCode.confirmPasswordReset(code, newPassword)

// export const refreshPage = () => firebase.auth().currentUser.onIdTokenChanged();

// export const redirectUser = () => firebase.auth().currentUser.getRedirectResult()
 




export const logout = () => firebase.auth().signOut();

export const login = (email, password) =>
         firebase.auth().signInWithEmailAndPassword(email, password);

export const signUp = (email, password) => firebase
         .auth()
         .createUserWithEmailAndPassword(email, password);

export const getFirebaseIdToken = () =>
         firebase.auth().currentUser.getIdToken(false);
  


  


  