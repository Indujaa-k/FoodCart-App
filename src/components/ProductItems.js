import React from 'react';
import { FiShoppingCart } from "react-icons/fi";
import { IoIosHeartEmpty } from "react-icons/io";

const ProductItems = ({ item, handleWishList, handleAddToCart }) => {
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
            onClick={() => handleWishList(item)}
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
