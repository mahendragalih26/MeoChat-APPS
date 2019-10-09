import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyCOaWQ17F7rk01MpFvNshF6cGAsx-EV99A',
  authDomain: 'meochat-c07e5.firebaseapp.com',
  databaseURL: 'https://meochat-c07e5.firebaseio.com',
  projectId: 'meochat-c07e5',
  storageBucket: 'meochat-c07e5.appspot.com',
  messagingSenderId: '506923276738',
  appId: '1:506923276738:web:6de59f880cf10ee1eb5e5b',
  measurementId: 'G-KJERMVE2PN',
};
firebase.initializeApp(firebaseConfig);

export default firebase;
