import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY,
    clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
    clientId: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_ID,
    authUri: process.env.NEXT_PUBLIC_FIREBASE_AUTH_URI,
    tokenUri: process.env.NEXT_PUBLIC_FIREBASE_TOKEN_URI,
    authProviderX509CertUrl: process.env.NEXT_PUBLIC_FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    clientX509CertUrl: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_X509_CERT_URL,
    universeDomain: process.env.NEXT_PUBLIC_FIREBASE_UNIVERSE_DOMAIN,
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);