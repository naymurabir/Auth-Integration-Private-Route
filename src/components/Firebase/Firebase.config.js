import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDOBSefdsTUqdRTNxbe36Jg_on9gnijocA",
    authDomain: "auth-integration-revision.firebaseapp.com",
    projectId: "auth-integration-revision",
    storageBucket: "auth-integration-revision.appspot.com",
    messagingSenderId: "680127322924",
    appId: "1:680127322924:web:fa07ab7db41dce0c9baa89"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth;