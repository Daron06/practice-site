import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import firebaseConfig from './firebaseConfig';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
} else {
  firebase.app()
}

const db = firebase.firestore();

const usersRef = db.collection('users');
const tasksRef = db.collection('tasks');
const messagesRef = db.collection('messages');
const lessonRef = db.collection("lesson");
const resourcesRef = db.collection("resources");

export { lessonRef, tasksRef, firebase, usersRef, resourcesRef, messagesRef };
