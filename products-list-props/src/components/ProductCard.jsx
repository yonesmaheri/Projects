function ProductCard(props) {
  return (
    <div className="bg-white border hover:shadow-xl shadow-md transition-all duration-300 rounded-2xl p-6 mb-6 flex flex-col gap-3">
      
      <h2 className="text-xl font-semibold text-gray-800">
        {props.name}
      </h2>

      <p className="text-lg font-bold text-green-600">
        {props.price.toLocaleString()} $
      </p>

      <p className="text-gray-500 text-sm">
        {props.desc}
      </p>

      <button className="bg-blue-600 text-white rounded-xl py-2 mt-2 hover:bg-blue-700 transition">
        Add to cart
      </button>
    </div>
  );
}

export default ProductCard;
