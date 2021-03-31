import Head from "next/head";
import products from "../products.json";

export default function Home() {
  console.log(products);
  return (
    <>
      <Head>
        <title>My Shop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="max-w-6xl mx-auto my-5">
        <h1 className="text-center font-bold text-5xl">Warehouse</h1>
        <p className="font-semibold text-center my-4 text-lg">
          Tu tienda de tecnología online líder por precio, calidad y servicio
        </p>
        <div className="grid gap-3 mx-3 lg:mx-0 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="shadow-md rounded bg-gray-200"
            >
              <div className="flex flex-col h-full">
              <img
                src={product.Url}
                className="h-3/4 rounded-t w-full mx-auto"
              />
              <div className="p-4 my-auto space-y-3">
                <h1 className="font-semibold text-2xl">{product.Name}</h1>
                <p className="font-semibold">Precio: ${product.price}</p>
              </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
