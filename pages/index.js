import { useState, createContext, useContext } from "react";
import Head from "next/head";
import { useCart } from "../hooks/use-cart";
import products from "../products.json";

export default function Home() {
  const { subtotal, totalItems, checkout, addToCart } = useCart();

  return (
    <>
      <Head>
        <title>My Shop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="max-w-6xl mx-auto my-5">
        <h1 className="text-center text-transparent bg-clip-text bg-gradient-to-br from-green-400 to-blue-700 font-bold text-5xl">
          Warehouse
        </h1>
        <p className="font-semibold text-center my-4 text-lg">
          Tu tienda de tecnología online líder por precio, calidad y servicio
        </p>
        <div className="grid gap-3 mx-3 lg:mx-0 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div key={product.id} className="shadow-md rounded bg-gray-100">
              <div className="flex flex-col h-full">
                <img
                  src={product.Url}
                  className="h-3/4 rounded-t w-full mx-auto"
                  alt={product.Name}
                />
                <div className="p-4 my-auto space-y-3">
                  <h1 className="font-semibold text-2xl">{product.Name}</h1>
                  <p className="font-semibold">Precio: ${product.price}</p>
                  <button
                    className="bg-indigo-600 focus:outline-none font-semibold duration-300 transform hover:scale-105 text-indigo-100 rounded px-4 py-2"
                    onClick={() => {
                      addToCart({
                        id: product.id,
                      });
                    }}
                  >
                    Añadir al carrito
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
