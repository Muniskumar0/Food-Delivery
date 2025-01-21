import React from 'react';
import './Style.css'

const Payment = ({ onClose }) => {
  return (
    <div className='payContainer'>
      <div className='payBox'>
        <h2>Select Payment Method</h2>
        <button className='gpay-btn btn'
          onClick={() => alert('You selected GPay')}>
          GPay
        </button>
        <button className='paytm-btn btn'
          onClick={() => alert('You selected Paytm')}>
          Paytm
        </button>
        <button className='phonePay-btn btn'
          onClick={() => alert('You selected Phone Pay')}>
          PhonePay
        </button>
        <button className='cancel-btn btn'
          onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Payment;
