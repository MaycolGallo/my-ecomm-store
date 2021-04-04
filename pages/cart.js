import Head from "next/head";
import products from "../products.json";
import { useCart } from "../hooks/use-cart";

const cart = () => {
  const { cartItems, checkout } = useCart();
  const data = cartItems.map((item) => {
    const product = products.find(({ id }) => id === item.id);
    return {
      ...item,
      total: item.quantity * item.precio,
      title: product.Name,
    };
  });

  return (
    <div className=" my-4 md:mt-10">
      <Head>
        <title>Carrito de compras | Warehouse</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mx-3 md:mx-5 p-3">
        <div className=" flex max-w-5xl mx-auto sm:px-6 lg:px-8 mb-10">
          <h1 className="font-bold text-5xl flex mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="text-gray-900 h-14 w-14 mr-2 my-auto"
            >
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
            Cart Page
          </h1>
        </div>
        <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow-md overflow-hidden border-b border-gray-200 rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-blue-500">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-base font-medium text-gray-50 uppercase tracking-wider"
                        >
                          Producto
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-base font-medium text-gray-50 uppercase tracking-wider"
                        >
                          Cantidad
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-base font-medium text-gray-50 uppercase tracking-wider"
                        >
                          Precio c/u
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-base font-medium text-gray-50 uppercase tracking-wider"
                        >
                          total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {data.map((item) => (
                        <tr key={item.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-900">
                            {item.title}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-500">
                            {item.quantity}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-500">
                            {item.precio}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-500">
                            ${item.total}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="my-10 text-center">
            <button
              onClick={checkout}
              className="bg-purple-500 focus:outline-none font-semibold duration-300 transform hover:scale-105 text-purple-100 rounded text-2xl px-6 py-3"
            >
              Checkout
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default cart;
{
  /* show toltip de added
    function bye(){
	a.classNameList.remove("show")
    setTimeout(function(){ a.classNameList.add("show") }, 3000);
}*/
}
