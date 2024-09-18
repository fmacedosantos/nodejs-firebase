import express, { response } from 'express';
import admin from 'firebase-admin'
import { authenticateToken } from './middlewares/authenticate-jwt.js';

// REST API
const app = express();

admin.initializeApp({
  credential: admin.credential.cert("serviceAccountKey.json")
});

// GET
app.get('/transactions', authenticateToken, (request, response) => {

    admin.firestore()
    .collection('transactions')
    .where('user.uid', '==', request.user.uid)
    .orderBy('date', 'desc')
    .get()
    .then(snapshot => {
        const transactions = snapshot.docs.map(doc => ({
            ...doc.data(),
            uid: doc.id
        }))
        response.json(transactions)
    })
})

app.listen(3000, () => console.log('API REST iniciada em http://localhost:3000'))