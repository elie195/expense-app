// Import the functions you need from the SDKs you need
import * as firebase from 'firebase';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();

export { firebase, database as default };

// const getVal = async () => {
//   const expenses = [];
//   const snapshot = await database.ref('expenses').once('value');
//   snapshot.forEach(childSnap => {
//     expenses.push({
//       id: childSnap.key,
//       ...childSnap.val()
//     });
//   });
//   console.log(expenses);
// };

// const expenses = getVal();
// console.log(expenses);

// database.ref('expenses').push({
//   description: 'Rent',
//   note: '',
//   amount: 2300,
//   createdAt: 1238583
// });

// database.ref('expenses').push({
//   description: 'Phone bill',
//   note: '',
//   amount: 245300,
//   createdAt: 454443
// });

// database.ref('expenses').push({
//   description: 'Rent',
//   note: '',
//   amount: 3900,
//   createdAt: 22332234
// });
