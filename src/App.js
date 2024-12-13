import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './assert/sass/main.scss';
import Header from './components/Header';
import Home from './components/Home';
import Product from './components/Product';
import WishList from './components/WishList';
import Cart from './components/Cart';
import Checkout from './components/Checkout'; // Import the Checkout component

const App = () => {
  const getInitialState = (key) => {
    const savedData = localStorage.getItem(key);
    return savedData ? JSON.parse(savedData) : [];
  };

  const [wishList, setWishList] = useState(() => getInitialState("wishList"));
  const [cartList, setCartList] = useState(() => getInitialState("cartList"));
  const [search, setSearch] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem("wishList", JSON.stringify(wishList));
    } catch (e) {
      console.error("Error saving wishList to localStorage", e);
    }
  }, [wishList]);

  useEffect(() => {
    try {
      localStorage.setItem("cartList", JSON.stringify(cartList));
    } catch (e) {
      console.error("Error saving cartList to localStorage", e);
    }
  }, [cartList]);

  const handleAddToCart = (item) => {
    setCartList((prevList) => {
      const existingItem = prevList.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevList.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevList, { ...item, quantity: 1 }];
      }
    });
  };

  const handleAddToWishList = (item) => {
    setWishList((prevList) => {
      if (!prevList.some((wishlistItem) => wishlistItem.id === item.id)) {
        return [...prevList, item];
      } else {
        alert("Item already exists in the wishlist");
        return prevList;
      }
    });
  };

  return (
    <>
      <BrowserRouter>
        <Header
          setSearch={setSearch}
          cartCount={cartList.length}
          wishlistCount={wishList.length}
        />
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  handleWishList={handleAddToWishList}
                  handleAddToCart={handleAddToCart}
                />
              }
            />
            <Route
              path="/product"
              element={
                <Product
                  handleWishList={handleAddToWishList}
                  handleAddToCart={handleAddToCart}
                  search={search}
                />
              }
            />
            <Route
              path="/wishlist"
              element={<WishList wishList={wishList} setWishList={setWishList} />}
            />
            <Route
              path="/cart"
              element={<Cart cartList={cartList} setCartList={setCartList} />}
            />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
