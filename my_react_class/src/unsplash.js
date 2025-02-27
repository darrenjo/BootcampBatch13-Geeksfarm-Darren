import React, { useState } from "react";
import axios from "axios";

const UnsplashSearch = () => {
  const [query, setQuery] = useState("");
  const [count, setCount] = useState(1);
  const [images, setImages] = useState([]);

  const fetchImages = async (event) => {
    event.preventDefault();
    const accessKey = process.env.REACT_APP_KEY;
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/search/photos`,
        {
          params: { query, per_page: count },
          headers: { Authorization: `Client-ID ${accessKey}` },
        }
      );
      setImages(response.data.results);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  return (
    <div>
      <h2>Unsplash Image Search</h2>
      <form onSubmit={fetchImages}>
        <input
          type="text"
          placeholder="Enter keyword"
          onChange={(e) => setQuery(e.target.value)}
        />
        <input
          type="number"
          min="1"
          max="10"
          placeholder="Number of images"
          onChange={(e) => setCount(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {images.map((image) => (
          <img
            id={image.id}
            src={image.urls.small}
            alt={image.slug}
            alt2={image.alternative_slugs.ko}
            link={image.links.html}
            style={{ width: "200px", height: "auto" }}
          />
        ))}
      </div>
    </div>
  );
};

export default UnsplashSearch;
