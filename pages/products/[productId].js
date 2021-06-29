import Head from "next/head";
import products from "../../products.json";
import toast, { Toaster } from "react-hot-toast";

import { useCart } from "../../hooks/use-cart";

const Product = ({ product }) => {
  const { addToCart } = useCart();
  function savePayment(productId) {
    addToCart({
      id: productId
    })
    const notify = () =>
      toast.success("Añadido al Carrito", {
        style: {
          borderRadius: "0.25rem",
          backgroundColor: "#4B5563",
          padding: "0.5rem 1rem 0.5rem 1rem",
          color: "#F3F4F6",
          fontSize: "1.125rem",
          fontWeight: "500",
        },
        iconTheme: {
          primary: "#059669",
          secondary: "#F3F4F6",
        },
      });
    notify()
  }
  return (
    <div className="flex my-4 md:mt-10 justify-center">
      <Toaster position="bottom-center" reverseOrder={false} />
      <Head>
        <title>{product.Name} | Warehouse</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mx-3 md:mx-5 max-w-2xl p-3 rounded">
        <div className="md:flex">
          <img src={product.Url} className="rounded md:w-1/2" alt={product.Name} />
          <div className="my-auto sml-5 p-4 bg-rewd-100 space-y-4">
            <h1 className="font-semibold text-4xl">{product.Name}</h1>
            <p>{product.Description}</p>
            <p className="font-semibold text-lg">Precio: ${product.price}</p>
            <button
              onClick={() => {
                savePayment(product.id)
              }}
              className="bg-indigo-600 focus:outline-none w-full transform transition duration-150 ease-in hover:scale-105 text-indigo-100 rounded-full text-lg font-semibold px-4 py-2"
            >
              Comprar
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Product;

export async function getStaticProps({ params }) {
  const product = products.find(({ id }) => id === params.productId);
  return {
    props: {
      product,
    },
  };
}

export async function getStaticPaths() {
  const paths = products.map((product) => {
    return {
      params: {
        productId: product.id,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}
