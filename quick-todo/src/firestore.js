import firebase from "@firebase/app";
import "@firebase/firestore";

const config = {
  apiKey: "AIzaSyCgyzOCS5E4qrJEAVMtyfG_8LDwG4z-GG4",
  authDomain: "quick-todo-a41ba.firebaseapp.com",
  databaseURL: "https://quick-todo-a41ba.firebaseio.com",
  projectId: "quick-todo-a41ba",
  storageBucket: "quick-todo-a41ba.appspot.com",
  messagingSenderId: "680784774491"
};

const app = firebase.initializeApp(config);
const firestore = firebase.firestore(app);

export default firestore;
