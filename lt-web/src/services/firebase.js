import dotenv from "dotenv";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

dotenv.config();

const app = initializeApp(JSON.parse(process.env.FIREBASE_CONFIG));
const auth = getAuth(app);


export { auth };