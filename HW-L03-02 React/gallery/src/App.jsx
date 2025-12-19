import { useEffect, useState } from "react";
import PhotoList from "./components/PhotoList";

function App() {


  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setLoading(true);

    fetch(
      `https://api.pexels.com/v1/curated?per_page=9&page=${page}`,
      {
        headers: {
          Authorization: 'uQEI62kXZVgQTz1VvrW1CkSvd72DfPVhhGGOD4JIjw7hwToTa1WytcC8',
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setPhotos((prev) => [...prev, ...data.photos]);
      })
      .finally(() => setLoading(false));
  }, [page]);


  return (
    <div className="bg-slate-100 min-h-screen py-10">
      <div className="max-w-5xl mx-auto">
        <PhotoList photos={photos || []} />

        <div className="flex justify-center mt-8">
          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={loading}
            className="px-5 py-2 rounded-lg bg-blue-100 text-blue-600
            font-medium hover:bg-blue-200 transition disabled:opacity-50"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
