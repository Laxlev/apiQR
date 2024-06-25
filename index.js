import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./.env";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";
import express from 'express';
import { getDocs } from "firebase/firestore";


const app = initializeApp(firebaseConfig);
const server = express();
const port = server.get('port') || 1722;

const db = getFirestore(app);

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

server.get('/users/:id', async (req, res) => {
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