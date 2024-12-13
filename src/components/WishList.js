import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { cartandWishContext } from '../App';

//  value passed as props{ wishList, setWishList }
const WishList = () => {

  const removeFilter = (item) => {
    setWishList(wishList.filter((wishlist) => (
      wishlist.id !== item.id)
    ))
  }
   const {wishList,setWishList}=useContext(cartandWishContext)
  return (
    <>
      <div className='wishlist-heading'> My  WishList</div>

      {(wishList.length > 0 ? (<div className="wishlist-items">
        {wishList.map((item) => (
          <div className="wishlist-container" key={item.id}>
            <div className="wishlist-container-img">
              <img src={require(`../assert/img/${item.pic}`)} alt={item.name} />
            </div>
            <div className="wishlist-container-division-name">{item.name}</div>
            <div className="wishlist-container-division-price">₹{item.amt}</div>
            <div className="wishlist-remove">
              <button onClick={() => removeFilter(item)}>Remove</button>
            </div>
          </div>
        ))}
      </div>) : (
        <>
          <div className="emptylist-display-wish">
            <img
              src={require(`../assert/img/wishlistempty.png`)}>
            </img>
          </div>
          <div className='wishemptybutton'>

            <div className="empty-text">Your wish list is empty</div>
            <div>
            <button className="explore">
              <Link to={"/product"}>Explore more</Link>
            </button>
            </div>
          </div>
        </>
      ))}

    </>
  );
};

export default WishList;
