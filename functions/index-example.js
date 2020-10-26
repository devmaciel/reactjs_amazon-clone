// const functions = require('firebase-functions');
// const express = require('express');
// const cors = require('cors');
// const stripe = require('stripe')('YOUR_CLIENT_SECRETKEY_FROM_STRIPE');

// // - API

// // - App config
// const app = express();

// // - Middlewares
// app.use(cors({ origin: true }));
// app.use(express.json()); 

// // - API routes
// app.get('/', (request, response) => response.status(200).send('hello world'));

// app.post('/payments/create', async (request, response) => {
//     const total = request.query.total;

//     console.log('Payment Request Received', total);

//     const paymentIntent = await stripe.paymentIntents.create({
//         amount: total, // subunites of the currency
//         currency: 'usd' // coin of the country
//     });
    
//     // OK - Created
//     response.status(201).send({
//         clientSecret: paymentIntent.client_secret //client_secret are in the paymentIntent const
//     });
// })

// // - Listen command
// exports.api = functions.https.onRequest(app)

// // example endpoint
// // http://localhost:5001/challenge-b90f1/us-central1/api