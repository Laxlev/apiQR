import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./QR.enviroments.js";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";
import express from 'express';
import { getDocs } from "firebase/firestore";


const app = initializeApp(firebaseConfig);
const server = express();
const port = server.get('port') || 1722;

const db = getFirestore(app);

const collectionRef = collection(db, 'citas');
const snapshot = await getDocs(collectionRef);
snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
});


server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});