import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA4yClWHZCoJbHHr1qro9XtUY3nx-SwZf4',
  authDomain: 'coach-assistant-2c82b.firebaseapp.com',
  projectId: 'coach-assistant-2c82b',
  storageBucket: 'coach-assistant-2c82b.firebasestorage.app',
  messagingSenderId: '854712331627',
  appId: '1:854712331627:web:f8a01e488b3cae677df02e',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
