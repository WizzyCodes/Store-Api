import { useState, useEffect } from "react";
import Modal from "./Modal";

const App = () => {
  const [products, setProducts] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleProductClick = (data: any) => {
    setSelectedProduct(data);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  if (loading) {
    return <div className="text-center mt-10 text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-600">{error}</div>;
  }

  return (
    <div className="bg-gray-900 min-h-screen py-8 text-center">
      <h1 className="text-center text-3xl font-serif text-white mb-8">
        Ecommerce
      </h1>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 font-medium capitalize px-3 pt-2">
          {products.map((el: any) => (
            <div
              key={el.id}
              className="bg-white shadow-inner border-black rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-75 cursor-pointer shadow-slate-50"
            >
              <h1 className="uppercase my-4 text-center font-semibold">
                {el.category}
              </h1>
              <img
                src={el.image}
                alt={el.title}
                className="w-full h-40 object-center object-contain"
              />
              <div className="p-4">
                <h2 className="font-semibold mb-4 text-center  text-gray-800 uppercase ">
                  {el.title.slice(0, 20)}
                </h2>
                <p className="text-[12px] text-gray-600 mt-2">
                  {el.description.slice(0, 100)}...
                </p>

                <div className="flex items-center mt-4">
                  <div className="flex text-amber-500 text-lg">
                    {[...Array(Math.round(el.rating.rate))].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                    {[...Array(5 - Math.round(el.rating.rate))].map((_, i) => (
                      <span key={i}>☆</span>
                    ))}
                    <span className="ml-2 text-gray-600 text-sm">
                      ({el.rating.count} reviews)
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center text-center">
                  <span className="text-lg font-semibold text-gray-900">
                    ${el.price}
                  </span>
                  <button
                    className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
                    onClick={() => handleProductClick(el)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedProduct && (
        <Modal product={selectedProduct} onClose={closeModal} />
      )}
    </div>
  );
};

export default App;
