import React, { createRef, useState } from "react";
import axios from "axios";
import Masonry from "react-masonry-css";
import "./styles/masonry.css";

const UnsplashSearch = () => {
  const [query, setQuery] = useState("");
  const [count, setCount] = useState(1);
  const [images, setImages] = useState([]);
  const imageRefs = images.map(() => createRef());

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
      <Masonry
        breakpointCols={{ default: 4, 1100: 3, 700: 2, 500: 1 }}
        className="masonry-grid"
        columnClassName="masonry-grid_column"
      >
        {images.map((image, index) => (
          <div key={image.id} ref={imageRefs[index]} className="masonry-item">
            <img
              id={image.id}
              src={image.urls.regular}
              alt={image.slug}
              alt2={image.alternative_slugs.ko}
              link={image.links.html}
              style={{ width: "100%", borderRadius: "10px", display: "block" }}
            />
          </div>
        ))}
      </Masonry>
    </div>
  );
};

export default UnsplashSearch;
