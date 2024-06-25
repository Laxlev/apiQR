import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import express from 'express';

const serviceAccount = {
    type: process.env.type,
    project_id: process.env.project_id,
    private_key_id: process.env.private_key_id,
    private_key: process.env.private_key,
    client_email: process.env.client_email,
    client_id: process.env.client_id,
    auth_uri: process.env.auth_uri,
    token_uri: process.env.token_uri,
    auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
    client_x509_cert_url: process.env.client_x509_cert_url,
    universe_domain: process.env.universe_domain
};

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

export { server };