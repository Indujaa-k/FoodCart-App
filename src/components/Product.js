import React, { useState } from 'react';
import data from '../assert/products.json';
import { ProductItems } from './ProductItems';

const Product = ({ handleWishList, handleAddToCart,search }) => {
  
  const [productMap] = useState(data);

  const filterItems= productMap.filter((items)=>(
      items.name.toLowerCase().includes(search?.toLowerCase()||"") 
  ));

  return (
    <div className="products">
      {filterItems.map((item) => (
        <ProductItems
          key={item.id}
          item={item}
          handleWishList={handleWishList}
          handleAddToCart={handleAddToCart}
          
        />
      ))}
    </div>
  );
};

export default Product;
