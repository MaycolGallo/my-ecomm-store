import "../styles/globals.css";
import { Navbar } from "../components/Navbar";
import { cartContext,useCartState } from "../hooks/use-cart";

function MyApp({ Component, pageProps }) {
  const cart = useCartState()
  return (
    <cartContext.Provider value={cart}>
      <Navbar />
      <Component {...pageProps} />
    </cartContext.Provider>
  );
}

export default MyApp;
