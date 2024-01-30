import React, { useContext, useState } from "react";
import { CartContext } from "../store/cartContextProvider";
import "./cart.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Cart() {
  const { item } = useContext(CartContext);
  const [cartItem, setCartItem] = item;

  const placeOrder = () => {
    fetch("http://localhost:3000/api/v1/orders", {
      method: "POST",
      body: JSON.stringify(cartItem, ["id", "qty", "price"]),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((result) => handleSuccess(result))
      .catch((error) => {console.error('Error:', error.message);})
  };

  const handleSuccess = (res) => {
    console.log(res);
    toast.success(`Order Placed Successfully. Your Order Number is #${res.id}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    resetCart();
  };
  const increaseQty = (currItem) => {
    const itemIndex = cartItem.findIndex((item) => item.id === currItem);
    cartItem[itemIndex].qty++;
    setCartItem(cartItem);
  };

  const decreseQty = (currItem) => {
    const itemIndex = cartItem.findIndex((item) => item.id === currItem);
    cartItem[itemIndex].qty--;
    setCartItem(cartItem);
    if (cartItem[itemIndex].qty <= 0) {
      const cartDuplicate = [...cartItem];
      cartDuplicate.splice(itemIndex, 1);
      setCartItem(cartDuplicate);
    }
  };

  const resetCart = () => {
    setCartItem([]);
  };

  return (
    <>
      <div className="shopping-cart">
        <div className="shopping-cart-header">
          <i className="fa fa-shopping-cart cart-icon"></i>
          <span className="badge">{cartItem.length}</span>
          <div className="shopping-cart-total">
            <span className="lighter-text">Total:</span>
            <span className="main-color-text">$2,229.97</span>
          </div>
        </div>

        <ul className="shopping-cart-items">
          {cartItem.map((item) => (
            <li className="clearfix">
              <img src={item.image} alt="item1" width={70} height={70} />
              <span className="item-name">{item.name}</span>
              <span className="item-price">{item.price * item.qty}</span>
              <span className="item-quantity">Quantity: {item.qty}</span>
              <button
                className="prdct-qty-btn"
                type="button"
                onClick={() => {
                  decreseQty(item.id);
                }}
              >
                <i className="fa fa-minus"></i>
              </button>
              <button
                className="prdct-qty-btn"
                type="button"
                onClick={() => {
                  increaseQty(item.id);
                }}
              >
                <i className="fa fa-plus"></i>
              </button>
            </li>
          ))}
        </ul>
        {cartItem.length <= 0 ? (
          <div>Oops your cart is empty</div>
        ) : (
          <button
            className="button"
            onClick={() => {
              placeOrder();
            }}
          >
            Checkout
          </button>
        )}
      </div>
    </>
  );
}

export default Cart;
