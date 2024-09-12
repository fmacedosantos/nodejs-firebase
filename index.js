import express, { response } from 'express';
import admin from 'firebase-admin'

// REST API
const app = express();

admin.initializeApp({
  credential: admin.credential.cert("serviceAccountKey.json")
});

// GET
app.get('/transactions', async (request, response) => {
    // Autenticação
    const jwt = request.headers.authorization;
    if (!jwt) {
        response.status(401).json({message: 'Usuário não autorizado!'})
        return;
    }

    let decodedIdToken = '';
    try {
        decodedIdToken = await admin.auth().verifyIdToken(jwt, true);
    } catch (error) {
        response.status(401).json({message: 'Usuário não autorizado!'})
        return;
    }

    admin.firestore()
    .collection('transactions')
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