import { useState } from "react";
import {initiateCheckout} from '../lib/payments'
import products from "../products.json";

const defaultCart = {
  products: {},
};

export default function useCart() {
  const [cart, updateCart] = useState(defaultCart);

  const cartItems = Object.keys(cart.products).map((key) => {
    const product = products.find(({ id }) => `${id}` === `${key}`);
    return {
      ...cart.products[key],
      precio: product.price,
    };
  });

  const subtotal = cartItems.reduce((accumulator, { precio, quantity }) => {
    return accumulator + (precio * quantity);
  }, 0);

  const totalItems = cartItems.reduce((accumulator, { quantity }) => {
    return accumulator + quantity;
  }, 0);

  console.log("holo", cartItems);

  const addToCart = ({ id } = {}) => {
    updateCart((prev) => {
      let cartState = { ...prev };

      if (cartState.products[id]) {
        cartState.products[id].quantity = cartState.products[id].quantity + 1;
      } else {
        cartState.products[id] = {
          id,
          quantity: 1,
        };
      }
      return cartState;
    });
  };

  function checkout() {
    initiateCheckout({
      lineItems: cartItems.map((item) => {
        return {
          price: item.id,
          quantity: item.quantity,
        };
      }),
    });
  }
  return {
    cart,
    updateCart,
    subtotal,
    totalItems,
    checkout,
    addToCart
  };
}
