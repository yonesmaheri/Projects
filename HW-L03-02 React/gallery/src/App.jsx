import { useEffect, useState } from "react";
import PhotoList from "./components/PhotoList";

function App() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await fetch(
          "https://api.pexels.com/v1/curated?per_page=12",
          {
            headers: {
              Authorization: 'uQEI62kXZVgQTz1VvrW1CkSvd72DfPVhhGGOD4JIjw7hwToTa1WytcC8',
            },
          }
        );

        const data = await res.json();
        setPhotos(data.photos);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPhotos();
  }, []);

  return (
    <div className="bg-slate-100 min-h-screen py-10">
      <div className="max-w-5xl mx-auto">
        <PhotoList photos={photos} />
      </div>
    </div>
  );
}

export default App;
