import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import express from 'express';

// Initialize Firebase Admin SDK
const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);
initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

const server = express();
const port = 3000;

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

server.get('/', (req, res) => {
    res.send('Hello World');
});

server.get('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const docRef = db.collection('users').doc(id);
        const doc = await docRef.get();

        if (doc.exists) {
            console.log('Document data:', doc.data());
            res.json(doc.data());
        } else {
            console.log('No such document!');
            res.status(404).json({error: 'Usuario no encontrado!'});
        }
    } catch (error) {
        console.error('Error fetching document:', error);
        res.status(500).json({error: 'Internal server error', details: error.message});
    }
});

export default server;