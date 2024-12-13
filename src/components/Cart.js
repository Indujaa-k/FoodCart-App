import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";

const Cart = ({ cartList, setCartList }) => {
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [shipping, setShipping] = useState(50);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newSubtotal = cartList.reduce(
      (acc, item) => acc + item.amt * item.quantity,
      0
    );
    setSubtotal(newSubtotal);
    const newTax = newSubtotal * 0.005;
    setTax(newTax);
    setTotal(newSubtotal + newTax + (newSubtotal > 500 ? 0 : shipping));
  }, [cartList, shipping]);

  const cartDelete = (item) => {
    setCartList(cartList.filter((cartlist) => item.id !== cartlist.id));
  };

  const updateCart = (item, newQuantity) => {
    setCartList(
      cartList.map((cartlist) =>
        item.id === cartlist.id
          ? { ...cartlist, quantity: parseInt(newQuantity) }
          : cartlist
      )
    );
  };

  return (
    <>
      <div className="cart-header">
        <FiShoppingBag /> My Cart
      </div>
      <div className="cart-section">
        <div className="cart">
          {cartList.length > 0 ? (
            <div className="cart-items">
              {cartList.map((item) => (
                <div className="cart-container" key={item.id}>
                  <div className="cart-container-img">
                    <img
                      src={require(`../assert/img/${item.pic}`)}
                      alt={item.name}
                    />
                  </div>
                  <div className="cart-container-division">
                    <div className="cart-container-division-name">{item.name}</div>
                    <div className="cart-container-division-price">
                      ₹{item.amt * item.quantity}
                    </div>
                  </div>
                  <div className="cart-container-ud">
                    <div className="cart-container-ud-update">
                      <select
                        value={item.quantity}
                        onChange={(e) => updateCart(item, e.target.value)}
                      >
                        {[...Array(10).keys()].map((num) => (
                          <option key={num + 1} value={num + 1}>
                            {num + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div
                      className="cart-container-ud-delete"
                      onClick={() => cartDelete(item)}
                    >
                      Delete
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <div className="emptylist-display">
                <img
                  src={require(`../assert/img/emptycart.webp`)}
                  alt="Empty Cart"
                />
              </div>
              <div className="button">
                <button className="explore">
                  <Link to={"/product"}>Explore more</Link>
                </button>
              </div>
            </div>
          )}
        </div>

        {cartList.length > 0 && (
          <div className="order-summary">
            <div className="order-summary-box">
              <h2>Order Summary</h2>
              <div className="summary-details">
                <div className="summary-item">
                  <span>Subtotal:</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-item">
                  <span>Tax (0.5%):</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="summary-item">
                  <span>Shipping:</span>
                  <span>{subtotal > 500 ? "Free" : shipping.toFixed(2)}</span>
                </div>
                <hr />
                <div className="summary-total">
                  <span>Total:</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
              <button className="checkout-button">
                <Link to="/checkout" state={{ subtotal, tax, shipping, total }}>
                  Proceed to Checkout
                </Link>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
