const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const port = 8000;

app.use(bodyParser.json());

// Google Pay Order Creation
app.post('/create-googlepay-order', async (req, res) => {
  const { amount } = req.body;

  // This is a simulated response; integrate the actual Google Pay API here.
  const paymentUrl = `https://pay.google.com/gp/p/gateway?amount=${amount}`;
  
  res.json({ paymentUrl });
});

// PhonePe Order Creation
app.post('/create-phonepe-order', async (req, res) => {
  const { amount } = req.body;

  // Simulated URL, replace with actual PhonePe API integration
  const paymentUrl = `https://www.phonepe.com/pay?amount=${amount}`;

  res.json({ paymentUrl });
});

// Paytm Order Creation
app.post('/create-paytm-order', async (req, res) => {
  const { amount } = req.body;

  // Simulated URL, replace with actual Paytm API integration
  const paymentUrl = `https://paytm.com/checkout?amount=${amount}`;

  res.json({ paymentUrl });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
