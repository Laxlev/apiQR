const express = require('express');
const admin = require('firebase-admin');
const serviceAccount = require('./ruta/a/tu/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://tu-proyecto.firebaseio.com'
});

const db = admin.firestore();
const app = express();
const port = 3000;

app.get('/data', async (req, res) => {
  try {
    const snapshot = await db.collection('citas').get();
    const data = snapshot.docs.map(doc => doc.data());
    res.json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
