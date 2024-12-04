const Modal = ({ product, onClose }: any) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center font-medium text-center">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <button className="text-white absolute top-4 right-4" onClick={onClose}>
          ✖
        </button>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48  rounded object-contain"
        />
        <h2 className="text-2xl font-bold mt-4">{product.title}</h2>
        <p className="text-gray-700 mt-2">{product.description}</p>
        <p className="text-lg font-bold text-blue-500 mt-4">${product.price}</p>
        <div className="flex items-center mt-4 text-center">
          <div className="flex text-amber-500 text-lg text-center">
            {[...Array(Math.round(product.rating.rate))].map((_, i) => (
              <span key={i}>★</span>
            ))}
            {[...Array(5 - Math.round(product.rating.rate))].map((_, i) => (
              <span key={i}>☆</span>
            ))}
            <span className="ml-2 text-gray-600 text-sm">
              ({product.rating.count} reviews)
            </span>
          </div>
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mt-4"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
