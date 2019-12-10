import app from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyAF0BCtrrZ11yhvxQEfqErGAi2lu_FrmNw',
  authDomain: 'react-app-e46f2.firebaseapp.com',
  databaseURL: 'https://react-app-e46f2.firebaseio.com',
  projectId: 'react-app-e46f2',
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

// const config =process.env.NODE_ENV === 'production' ? prodConfig : devConfig;
class Firebase{
  constructor(){
     // console.log(config)
    app.initializeApp(config);
    this.auth = app.auth();
  }
    // *** Auth API ***
    doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
    doPasswordUpdate = password =>
      this.auth.currentUser.updatePassword(password);
}
export default Firebase;