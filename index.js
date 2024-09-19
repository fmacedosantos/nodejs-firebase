import express from 'express';
import admin from 'firebase-admin'
import { transactionRouter } from './transactions/routes.js';

const app = express();

admin.initializeApp({
  credential: admin.credential.cert("serviceAccountKey.json")
});

app.use('/transactions', transactionRouter);

app.listen(3000, () => console.log('API REST iniciada em http://localhost:3000'))