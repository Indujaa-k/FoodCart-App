import React, { useReducer, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import tick from "../assert/img/tick.png";

const initial = {
  name: "",
  email: "",
  address: "",
  city: "",
  zipcode: "",
  paymentMethod: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return { ...state, [action.name]: action.value };
    case "PAYMENT_METHOD":
      return { ...state, paymentMethod: action.value };
    case "RESET_FORM":
      return initial;
    default:
      return state;
  }
};

const Checkout = () => {
  const location = useLocation();
  const { subtotal = 0, tax = 0, shipping = 50, total = 0 } = location.state || {};
  const [details, dispatch] = useReducer(reducer, initial);
  const [submitted, setSubmitted] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const checkOut = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "ADD_TASK", name, value });
  };

  const selectPaymentMethod = (e) => {
    const { value } = e.target;
    dispatch({ type: "PAYMENT_METHOD", value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsOrderPlaced(true);
    setSubmitted(true);
    console.log("Order placed:", details);
  };

  const resetForm = () => {
    dispatch({ type: "RESET_FORM" });
    setIsOrderPlaced(false);
    setSubmitted(false);
  };

  return (
    <>
      
      <div className="checkout-page">
        {/* Section 1 (Form) */}
        {!isOrderPlaced && (
          <div className="checkout-page-section-1">
            <h1 className="checkout-page-heading">Checkout</h1>
            <div className="checkout-content">
              <form className="checkout-form" onSubmit={handleSubmit}>
                {/* Billing Details */}

                <div className="flexdisplay">
                  <div className="user-details">
                    <h3 className="div-heading">Billing Details</h3>
                    <div className="form-group">
                      <label htmlFor="name">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={details.name}
                        onChange={checkOut}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={details.email}
                        onChange={checkOut}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="address">Address</label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={details.address}
                        onChange={checkOut}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="city">City</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={details.city}
                        onChange={checkOut}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="zipcode">ZIP Code</label>
                      <input
                        type="text"
                        id="zipcode"
                        name="zipcode"
                        value={details.zipcode}
                        onChange={checkOut}
                        required
                      />
                    </div>
                  </div>

                  {/* Payment Details */}

                  <div className="payment-methods">
                    <h3 className="div-heading">Payment Details</h3>
                    <div>Select Payment Method</div>
                    <div className="form-group">
                      <input
                        type="radio"
                        id="card"
                        name="paymentMethod"
                        value="Card"
                        checked={details.paymentMethod === "Card"}
                        onChange={selectPaymentMethod}
                      />
                      <label htmlFor="card">Credit/Debit Card</label>
                    </div>
                    <div className="form-group">
                      <input
                        type="radio"
                        id="gpay"
                        name="paymentMethod"
                        value="GPay"
                        checked={details.paymentMethod === "GPay"}
                        onChange={selectPaymentMethod}
                      />
                      <label htmlFor="gpay">Google Pay (GPay)</label>
                      <p className="payment-instruction">
                        <a href="https://pay.google.com/" target="_blank" rel="noopener noreferrer">
                          Pay with Google Pay
                        </a>
                      </p>
                    </div>
                    <div className="form-group">
                      <input
                        type="radio"
                        id="phonepe"
                        name="paymentMethod"
                        value="PhonePe"
                        checked={details.paymentMethod === "PhonePe"}
                        onChange={selectPaymentMethod}
                      />
                      <label htmlFor="phonepe">PhonePe</label>
                      <p className="payment-instruction">
                        <a href="https://paytm.com/" target="_blank" rel="noopener noreferrer">
                          Pay with Paytm
                        </a>
                      </p>
                    </div>
                    <div className="form-group">
                      <input
                        type="radio"
                        id="cod"
                        name="paymentMethod"
                        value="COD"
                        checked={details.paymentMethod === "COD"}
                        onChange={selectPaymentMethod}
                      />
                      <label htmlFor="cod">Cash on Delivery (COD)</label>
                      <p className="payment-instruction">
                        Pay in cash upon receiving the order.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="button-submit">
                <button type="submit" className="place-order-button">
                  Place Order
                </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Section 2 (Order Summary) */}
        {isOrderPlaced && (
          <div className="displayCheckout">
            <div className="displayCheckout-heading">
              <div className="displayCheckout-heading-text">
                Order placed
              </div>
              <div className="displayCheckout-heading-img">
                <img src={tick} alt="Order Confirmed" />
              </div>
            </div>
            <h3 className="display-check-head">Address:</h3>
            <div>{details.name}</div>
            <div>{details.email}</div>
            <div>{details.address}</div>
            <div>{details.city} - {details.zipcode}</div>
            <h3 className="display-check-head">Payment Method:</h3>
            <div>{details.paymentMethod || alert("Enter the payment method")}</div>

            {/* Order Summary */}
            <h3 className="display-check-head">Order Summary:</h3>
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
              <span>{subtotal > 500 ? "Free" : `₹${shipping.toFixed(2)}`}</span>
            </div>
            <hr />
            <div className="summary-total">
              <span>Total:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            <button onClick={resetForm}>Back to page</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Checkout;
