import React, { useState } from "react";
import axios from "axios";
import "./styles/youtube.css";

const YouTubeSearch = () => {
  const [query, setQuery] = useState("");
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const fetchVideos = async (event) => {
    event.preventDefault();
    const apiKey = process.env.REACT_APP_YTKEY;
    const maxResults = 6;

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_YTKEY}/youtube/v3/search`,
        {
          params: {
            part: "snippet",
            q: query,
            maxResults,
            key: apiKey,
            type: "video",
          },
        }
      );

      setVideos(response.data.items);
      setSelectedVideo(response.data.items[0]);
    } catch (error) {
      console.error("Error fetching YouTube videos:", error);
    }
  };

  return (
    <div className="youtube-container">
      <h2>YouTube Search</h2>
      <form className="search-form" onSubmit={fetchVideos}>
        <input
          type="text"
          placeholder="Search videos"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div className="video-layout">
        <div className="video-sidebar">
          {videos.map((video, index) => (
            <div
              key={video.id.videoId}
              className="video-item"
              onClick={() => setSelectedVideo(video)}
            >
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
              />
              <h4>{video.snippet.title}</h4>
            </div>
          ))}
        </div>

        <div className="video-main">
          {selectedVideo && (
            <iframe
              width="100%"
              height="400"
              src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}`}
              allowFullScreen
              title={selectedVideo.snippet.title}
            ></iframe>
          )}
        </div>
      </div>
    </div>
  );
};

export default YouTubeSearch;
