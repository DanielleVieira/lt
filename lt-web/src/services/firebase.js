import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const app = initializeApp(JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG));
const auth = getAuth(app);


export { auth };