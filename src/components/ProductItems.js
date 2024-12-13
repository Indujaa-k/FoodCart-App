import React, { useContext } from 'react';
import { FiShoppingCart } from "react-icons/fi";
import { IoIosHeartEmpty } from "react-icons/io";
import { cartandWishContext } from '../App';



// handleWishList, handleAddToCart
const ProductItems = ({ item }) => {
  const{handleAddToCart,handleAddToWishList}=useContext(cartandWishContext)
  return (
    <div className="product" key={item.id}>
      <div className="product-img">
        <img src={require(`../assert/img/${item.pic}`)} alt={item.name} />
      </div>
      <div className="product-name">{item.name}</div>
      <div className="product-details">
        <div className="product-details-price">₹{item.amt}</div>
        <div className="product-details-wish">
          <IoIosHeartEmpty
            className="product-icon"
            onClick={() => handleAddToWishList(item)}
          />
        </div>
        <div className="product-details-cart">
          <FiShoppingCart
            className="product-icon"
            onClick={() => handleAddToCart(item)}
          />
        </div>
      </div>
    </div>
  );
};

export { ProductItems };
