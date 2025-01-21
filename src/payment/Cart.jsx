import React, { useState } from 'react';
import './Style.css'
import img1 from   './img/pngwing.com.png'
import { FaMinus, FaPlus } from "react-icons/fa";
import Payment from './pay-option';

 

export default function Cart(){
    const[numbers,setNumber]=useState(1);
    const[prices,setPrice]=useState(299);
    const fee1 = 30;
    const fee2 = 10;
    const [fee3,setFee3]=useState(0);
    const total =prices + fee1 + fee2 + parseInt(fee3)
    const [isModalOpen, setIsModalOpen] = useState(false);


    const increase = ()=>{
      setNumber(numbers +1);
      setPrice(prices + 300)
    }
    const deccrease = ()=>{
      if(numbers>1){
        setNumber(numbers - 1);
        setPrice(prices - 300)
      }
      else{
        setNumber(numbers)
      }
    }
    const handleFee3 = (f) => {
      const tips = f.target.value;
      if (tips>= 0) {
        setFee3(tips); 
      } else {
        setFee3(0);
      }
    }
    
    const handlePayButtonClick = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };
      
  return(
    <>
      <div className="container">
        <div className="container1">
          <div className="img">
            <img src={img1} alt=""/>
            <div className='foodName'>
            <h3>Burger</h3>
            </div>
          </div>

          <div className="add">
            <h4 style={{width:'200px'}}>Burger</h4>
            <div className="plus">
              <FaMinus onClick={deccrease} style={{color:'red',cursor:'pointer'}} /> <h4> {numbers} </h4> <FaPlus onClick={increase} style={{color:'green',cursor:'pointer'}} />
            </div>
            <h4>${prices}</h4>
          </div>
          <div className="suggest">
            <input type="text" placeholder="Any suggestions?" />
          </div>
          <div className="bill">
            <h5>Bill Details</h5>
            <div className="bill-details">
              <span>Item Total</span><span>${prices}</span>
              <span>Delivery fee</span><span>${fee1}</span>
            </div>
            <hr />
            <div className="tip">
            <span>Delivery Tip</span><span><input type='number' value={fee3} onChange={handleFee3} /></span>
            <span>Platform fee</span><span>${fee2}</span>
            </div>
            <hr />
            <div className="pay">
              <h2>Total : ${total}</h2>
              <button onClick={handlePayButtonClick}>TO PAY</button>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && <Payment onClose={closeModal} />}
    </>
  )
}