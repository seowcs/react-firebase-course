import {initializeApp} from 'firebase/app';
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyCzt-foWxnuKBeYolmUZed93tb521MSPyg',
  authDomain: 'fir-react-course-72df7.firebaseapp.com',
  projectId: 'fir-react-course-72df7',
  storageBucket: 'fir-react-course-72df7.appspot.com',
  messagingSenderId: '959326833895',
  appId: '1:959326833895:web:f1bc1520e516b5405ea642',
  measurementId: 'G-3C798NLYLB'
};

// functional programming
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);