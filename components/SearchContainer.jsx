"use client";

import { useState } from "react";
import Image from "next/image";

const SearchContainer = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsSearching(true);
    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
      );
      if (!res.ok) {
        throw new Error("Failed To Fetch Data");
      }
      const data = await res.json();
      setResult(data.results);
      // console.log(data.results);
    } catch (err) {
      console.error(err);
    } finally {
      setQuery("");
      setIsSearching(false);
    }
  };

  return (
    <main className="search-result">
      <form className="row g-3" onSubmit={handleSearch}>
        <div className="col-md-11">
          <label htmlFor="keyword" className="visually-hidden">
            Keyword
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Keyword"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
          />
        </div>
        <div className="col-md-1">
          <button
            type="submit"
            className="btn btn-success mb-3"
            disabled={isSearching}
          >
            {isSearching ? "Loading Images..." : "Search"}
          </button>
        </div>
      </form>
      {/* Responses */}
      <div className="row">
        {result.map((photo) => (
          <div className="col-sm-4" key={photo.id}>
            <a href={photo.urls.full} target="_blank">
              <Image
                blurDataURL="/blurimg.png"
                placeholder="blur"
                src={photo.urls.full}
                alt={photo.alt_description}
                className="imgfix"
                width={photo.width}
                height={photo.height}
                loading="lazy"
              />
            </a>
          </div>
        ))}
      </div>
    </main>
  );
};

export default SearchContainer;
