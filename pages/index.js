import { useState } from "react";
import Head from "next/head";
import useCart from "../hooks/use-cart";
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
        <p className="space-x-4 text-center mt-4 mb-6 flex items-center justify-center text-2xl">
          <strong className="text-2xl font-semibold">Items: &nbsp;</strong>
          {totalItems}
          <strong className="text-2xl font-semibold">Total: $</strong>
          {subtotal}
          <button className="px-4 py-2 text-2xl font-bold text-indigo-500 focus:outline-none focus:border-indigo-700 flex" onClick={checkout}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="text-indigo-600 w-6 mr-2 h-6 my-auto"
            >
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
            Check Out
          </button>
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
