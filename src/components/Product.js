import React, { useContext, useState } from 'react';
import data from '../assert/products.json';
import { ProductItems } from './ProductItems';
import { cartandWishContext } from '../App';
//{ handleWishList, handleAddToCart,search }

const Product = () => {
  
   const {search}=useContext(cartandWishContext)
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
          // handleWishList={handleWishList}
          // handleAddToCart={handleAddToCart}
          
        />
      ))}
    </div>
  );
};

export default Product;
