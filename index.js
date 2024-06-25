import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";
import express from 'express';
import { getDocs } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId   
};
console.log(firebaseConfig);

const app = initializeApp(firebaseConfig);
const server = express();
const port = server.env.PORT || 3000;

const db = getFirestore(app);

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

server.get('/', (req, res) => {
    res.send('Hello World');
});

server.get('/users/:id', async (req, res) => {
    console.log('GET /users/:id');
    const id = req.params.id;
    const ref = doc(db, 'users', id);
    const docSnap = await getDoc(ref);

    if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());
        res.json(docSnap.data());
    }else{
        console.log('No such document!');
        res.json({error: 'Usuario no encontrado!'});
    }
});