import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDR1LDsUu5UrQNVy0UUXdkZ3JmRsg_VQIE",
  authDomain: "demoproject-8bcfb.firebaseapp.com",
  projectId: "demoproject-8bcfb",
  storageBucket: "demoproject-8bcfb.firebasestorage.app",
  messagingSenderId: "1005983365465",
  appId: "1:1005983365465:web:f3e9909e5ddcc6f5dfb448",
  databaseURL: "https://demoproject-8bcfb-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);