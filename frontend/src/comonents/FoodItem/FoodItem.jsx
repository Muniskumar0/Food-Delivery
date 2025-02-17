import React, { useContext, useState } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/frontend_assets/assets';
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItem, addToCart, removeFromCart } = useContext(StoreContext);
  const [isExpanded, setIsExpanded] = useState(false);

  // Max characters for description before truncating
  const MAX_DESCRIPTION_LENGTH = 150;

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const truncatedDescription = description.length > MAX_DESCRIPTION_LENGTH
    ? description.substring(0, MAX_DESCRIPTION_LENGTH) + '...'
    : description;

  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        {/* If image is available, show it, else show a default image */}
        <img className='food-item-img' src={image || assets.placeholder_image} alt={name} />
        
        {
          !cartItem[id] ? (
            <img 
              className='add' 
              onClick={() => addToCart(id)} 
              src={assets.add_icon_white} 
              alt="Add to cart" 
            />
          ) : (
            <div className='food-item-counter'>
              <img 
                onClick={() => removeFromCart(id)} 
                src={assets.remove_icon_red} 
                alt="Remove one item" 
              />
              <p>{cartItem[id]}</p>
              <img 
                onClick={() => addToCart(id)} 
                src={assets.add_icon_green} 
                alt="Add one item" 
              />
            </div>
          )
        }
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating stars" />
        </div>
        <p className='food-item-desp'>
          {isExpanded ? description : truncatedDescription}
        </p>
        {/* Show 'Read more' or 'Read less' based on whether the description is expanded */}
        {description.length > MAX_DESCRIPTION_LENGTH && (
          <p className="read-more" onClick={toggleDescription}>
            {isExpanded ? 'Read less' : 'Read more'}
          </p>
        )}
        <p className='food-item-price'>₹ {price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
