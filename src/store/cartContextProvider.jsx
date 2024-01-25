import * as React from "react";
import { useState, createContext } from "react";
import useLocalStorageState from "use-local-storage-state";

export const CartContext = createContext();

const CartContextProvider = (props) => {
  const [cartItem, setCartItem] = useLocalStorageState("cartItem", {
    defaultValue: [],
  });
  return (
    <CartContext.Provider value={{ item: [cartItem, setCartItem] }}>
      {props.children}
    </CartContext.Provider>
  );
};
export default CartContextProvider;
