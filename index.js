import express, { response } from 'express';

const app = express();

// GET
app.get('/transactions', (request, response) => {
    console.log('GET transactions');
    response.json([{id: 1}])
})

app.listen(3000, () => console.log('API REST iniciada em http://localhost:3000'))