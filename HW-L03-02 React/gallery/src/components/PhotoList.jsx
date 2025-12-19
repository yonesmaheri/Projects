function PhotoList({ photos }) {
  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-slate-800 border-b pb-2">
        Photos
      </h2>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <li
            key={photo.id}
            className="bg-white rounded-xl shadow-sm border border-slate-200
            transition-all duration-200 hover:shadow-md hover:border-blue-300
            overflow-hidden"
          >
            <img
              src={photo.src.medium}
              alt={photo.alt}
              className="w-full h-56 object-cover"
            />

            <div className="p-3">
              <p className="text-sm text-slate-600">
                {photo.photographer}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default PhotoList;
