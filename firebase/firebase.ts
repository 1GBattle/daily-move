import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyCaX7rvIOo_vcYzSWIsN3eqN8_N08558bE',
	authDomain: 'the-todo-app-10e36.firebaseapp.com',
	databaseURL: 'https://the-todo-app-10e36-default-rtdb.firebaseio.com',
	projectId: 'the-todo-app-10e36',
	storageBucket: 'the-todo-app-10e36.appspot.com',
	messagingSenderId: '1070848604854',
	appId: '1:1070848604854:web:08cab7d4687ff8edf68417',
	measurementId: 'G-0PSCQ3H7SR'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
