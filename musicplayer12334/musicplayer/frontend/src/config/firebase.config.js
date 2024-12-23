import {getApp,getApps,initializeApp} from 'firebase/app';
import {getStorage} from 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0eSh3fNuATn6_Vmf1v7diddpqrHn5mH8",
  authDomain: "bloger-new.firebaseapp.com",
  projectId: "bloger-new",
  storageBucket: "bloger-new.appspot.com",
  messagingSenderId: "1068476632922",
  appId: "1:1068476632922:web:40d25a856fa8e6b8172d63"
};
  
  // Initialize Firebase
  const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

  const storage = getStorage(app);

  export {app,storage};