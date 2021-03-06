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

  function updateItem({ id, quantity }) {
    updateCart((prev) => {
      let cartState = { ...prev };

      if (cartState.products[id]) {
        cartState.products[id].quantity = quantity;
      }
      if (cartState.products[id].quantity == 0) {
        delete cartState.products[id]
      }
      return cartState;
    });
  }

  function checkout() {
    initiateCheckout({
      lineItems: cartItems.map((item) => {
        if(item){
          return {
            price: item.id,
            quantity: item.quantity,
          }
        }
      }),
    });
  }
  return {
    cart,
    updateCart,
    subtotal,
    cartItems,
    updateItem,
    totalItems,
    checkout,
    addToCart,
  };
}
export function useCart() {
  const cart = useContext(cartContext);
  return cart;
}
