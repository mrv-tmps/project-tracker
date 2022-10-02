const firebaseConfig = {
  apiKey: process.env['NX_FIREBASE_API_KEY'],
  appId: process.env['NX_FIREBASE_APP_ID'],
  authDomain: process.env['NX_FIREBASE_AUTH_DOMAIN'],
  messagingSenderId: process.env['NX_FIREBASE_API_MESSAGING_SENDER_ID'],
  projectId: process.env['NX_FIREBASE_PROJECT_ID'],
  storageBucket: process.env['NX_FIREBASE_API_STORAGE_BUCKET'],
};

export default firebaseConfig;
