import React, { useState } from 'react';
import './Payment.css';

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();

    if (paymentMethod === 'creditCard') {
      setPaymentStatus('Processing payment...');
      setTimeout(() => {
        setPaymentStatus('Payment successful!');
      }, 2000);
    } else if (paymentMethod === 'paypal') {
      setPaymentStatus('Redirecting to PayPal...');
      setTimeout(() => {
        setPaymentStatus('Payment successful!');
      }, 2000);
    } else {
      setPaymentStatus('Please select a payment method.');
    }
  };

  return (
    <div className="payment-page">
      <h1>Payment Page</h1>
      <form onSubmit={handlePaymentSubmit} className="payment-form">
        <div className="payment-method">
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="creditCard"
              onChange={handlePaymentMethodChange}
            />
            Credit Card
          </label>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="paypal"
              onChange={handlePaymentMethodChange}
            />
            PayPal
          </label>
        </div>

        <button type="submit">Pay Now</button>
      </form>

      {paymentStatus && <p>{paymentStatus}</p>}
    </div>
  );
};

export default PaymentPage;
