import dotenv from 'dotenv';
import { initializeApp } from "firebase/app";

dotenv.config();

const app = initializeApp(JSON.parse(process.env.FIREBASE_CONFIG));


export { app };