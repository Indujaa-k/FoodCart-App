import React, { useState, useEffect, useContext } from 'react'
import data from '../assert/products.json';
import { FiShoppingBag } from "react-icons/fi";
import { IoIosHeartEmpty } from "react-icons/io";
import backgroundImg from '../assert/img/background.png';
import { Link } from 'react-router-dom';
import oreo from '../assert/img/oreo.png';
import strawberry from '../assert/img/strawberry.png';
import delivery from '../assert/img/delivery.png'
import { cartandWishContext } from '../App';

const Home = () => {

  const {handleAddToWishList,handleAddToCart}=useContext(cartandWishContext)
  const [randomValue, setRandomValue] = useState([])
  useEffect(() => {
    setRandomValue([...data].sort(() => Math.random() - 0.5).slice(0, 8));
  }, [])

  return (
    <>
      <div className='background'>
        <img src={backgroundImg}></img>
      </div>
      <div className="home">
        <div className="home-content">
          <div className='home-content-head'>____ Crave cart</div>
          <div className='home-content-text'>
            ProductFusion<br></br>
            where<br></br>
            <span class="green">Flavours</span> Ubite
          </div>
          <div className='home-content-info'>
            Treat yourself to a delightful food <br></br>adventure - shop now for tasty goodness!
          </div>
          <button><Link to={"/product"}>Shop Now</Link></button>
        </div>
        <div className="home-content">
          <img src={oreo}></img>
        </div>
      </div>
      {/* offer */}
      <div className='offers'>

      <div className="offer-division-1">
          <div className="offer-division-1-text">
            Free delivery on orders  ₹500!
            <br></br> Shop now and save big on
            <br></br> every purchase!
          </div>
        <div className='offer-division-1-img'>
          <img src={delivery}></img>
        </div>
        </div>

        <div className="offer-division-2">
          <div className="offer-division-2-text">
            <span className='offers'>Get Ready for Exciting Offers!!!</span>
            <span>Unlock 20% off on first 3 orders
              <br></br>
              – don’t miss out !</span>
          </div>
          <div className='offer-division-2-img'>
            <img src={strawberry}></img>
          </div>
        </div>

        
      </div>

      {/* popular items */}
      <h2>Popular Items</h2>
      <div className='popular-items'>

        {randomValue.map((item) => (<div className="popular-items-lists" key={item.id}>
          <div className="popular-items-lists-img">
            <img src={require(`../assert/img/${item.pic}`)} alt={item.name} />
          </div>
          <div className="popular-items-lists-name">{item.name}</div>
          <div className="popular-items-lists-details">
            <div className="popular-items-lists-details-price">₹{item.amt}</div>
            <div className="popular-items-lists-details-wish">
              <IoIosHeartEmpty
                className="popular-items-lists-icon"
                onClick={() =>handleAddToWishList(item)}
              />
            </div>
            <div className="popular-items-lists-cart">
              <FiShoppingBag
                className="popular-items-lists-icon"
                onClick={() => handleAddToCart(item)}
              />
            </div>
          </div>
        </div>))}
      </div>
      <footer className="footer">
  <div className="footer-container">
  
    <div className="footer-section brand">
      <h2>CraveCart</h2>
      <p>Your one-stop shop for delicious treats and amazing offers.</p>
    </div>

    <div className="footer-section">
      <h4>Explore</h4>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/">About Us</Link></li>
        <li><Link to="/product">Products</Link></li>
        <li><Link to="/">Contact</Link></li>
      </ul>
    </div>

  
    <div className="footer-section">
      <h4>Customer Support</h4>
      <ul>
        <li><Link to="/">FAQs</Link></li>
        <li><Link to="/">Shipping & Delivery</Link></li>
        <li><Link to="/">Returns Policy</Link></li>
        <li><Link to="/">Help Center</Link></li>
      </ul>
    </div>

   
    <div className="footer-section newsletter">
      <h4>Stay Updated</h4>
      <p>Sign up for our newsletter to get the latest offers and updates.</p>
      <form>
        <input type="email" placeholder="Enter your email" />
        <button type="submit">Subscribe</button>
      </form>
      <div className="social-links">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
      </div>
    </div>
  </div>

  <div className="footer-bottom">
    <p>&copy; 2024 CraveCart. All Rights Reserved. | <Link to="/privacy">Privacy Policy</Link> | <Link to="/terms">Terms of Service</Link></p>
  </div>
</footer>

    </>
  )
}

export default Home