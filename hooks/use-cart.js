import { useState, createContext, useContext, useEffect } from "react";
import { initiateCheckout } from "../lib/payments";
import products from "../products.json";

const defaultCart = {
  products: {},
};

export const cartContext = createContext();

export function useCartState() {
  const [cart, updateCart] = useState(defaultCart);

  useEffect(() => {
    const stateFromStorage = window.localStorage.getItem("product_cart");
    const data = stateFromStorage && JSON.parse(stateFromStorage);
    console.log(data);
    if (data) {
      updateCart(data);
    }
  }, []);

  useEffect(() => {
    const data = JSON.stringify(cart);
    window.localStorage.setItem("product_cart", data);
  }, [cart]);

  const cartItems = Object.keys(cart.products).map((key) => {
    const product = products.find(({ id }) => `${id}` === `${key}`);
    return {
      ...cart.products[key],
      precio: product.price,
    };
  });

  const subtotal = cartItems.reduce((accumulator, { precio, quantity }) => {
    return accumulator + precio * quantity;
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
    addToCart,
  };
}
export function useCart() {
  const cart = useContext(cartContext);
  return cart;
}
