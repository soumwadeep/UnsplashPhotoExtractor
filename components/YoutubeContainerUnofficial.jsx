"use client";

import { useState } from "react";
import { YoutubeTranscript } from "youtube-transcript-axios";

const YoutubeContainerUnofficial = () => {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const youtube_parser = (url) => {
    var regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : false;
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsSearching(true);
    try {
      const videoId = youtube_parser(url);
      if (!videoId) {
        throw new Error("Invalid YouTube URL");
      }
      const transcripts = await YoutubeTranscript.fetchTranscript(videoId);
      setResult(transcripts);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <main className="search-result">
      <form className="row g-3 sticky-top" onSubmit={handleSearch}>
        <div className="col-md-11">
          <label htmlFor="Url" className="visually-hidden">
            Youtube Video URL
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Youtube Video URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>
        <div className="col-md-1">
          <button
            type="submit"
            className="btn btn-success mb-3"
            disabled={isSearching}
          >
            {isSearching ? "Loading..." : "Search"}
          </button>
        </div>
      </form>
      {/* Responses */}
      <div className="row">
        {result.map((caption, index) => (
          <div className="col-sm-6" key={index}>
            <p>{caption.text}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default YoutubeContainerUnofficial;
