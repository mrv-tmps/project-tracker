// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDZIFh77TZXsTUkWtu_PeEKfyGUc5h8lGs',
  appId: '1:262074458915:web:12e6fdfa95f3ced9f92296',
  authDomain: 'project-tracker-991ec.firebaseapp.com',
  messagingSenderId: '262074458915',
  projectId: 'project-tracker-991ec',
  storageBucket: 'project-tracker-991ec.appspot.com'
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
