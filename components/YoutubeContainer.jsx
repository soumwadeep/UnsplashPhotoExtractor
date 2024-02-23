"use client";

import { useState } from "react";

const YoutubeContainer = () => {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState([]);
  const [captionId, setCaptionId] = useState("");
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
      const res = await fetch(
        `https://youtube.googleapis.com/youtube/v3/captions?part=snippet&videoId=${videoId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_CAPTION_API_KEY}`
      );
      if (!res.ok) {
        throw new Error("Failed To Fetch Data");
      }
      const data = await res.json();
      setResult(data.items);
      // console.log(data.items[0].id);
      setCaptionId(data.items[0].id);
      // Initiate Auth
      const authRes = await fetch(
        `https://accounts.google.com/o/oauth2/v2/auth?
        scope=https://www.googleapis.com/auth/youtube.force-ssl&
        include_granted_scopes=true&
        redirect_uri=https://searchphoto.soumwadeepguha.com/YoutubeTranscriptor&
        response_type=token&
        client_id=${process.env.NEXT_PUBLIC_YOUTUBE_CLIENT_ID}`
      );
      if (!res.ok) {
        throw new Error("Failed To Fetch Data");
      }
      const authData = await authRes.json();
      console.log("Auth:",authData);
      // Now Initiate Download
      const downloadData = await fetch(
        `https://youtube.googleapis.com/youtube/v3/captions/${data.items[0].id}?key=${process.env.NEXT_PUBLIC_YOUTUBE_CAPTION_API_KEY}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_YOUTUBE_CLIENT_SECRET_KEY}`,
            Accept: "application/json",
          },
        }
      );
      if (!downloadData.ok) {
        throw new Error("Failed To Fetch Data");
      }
      const fetchedData = await downloadData.json();
      console.log("Downloading", fetchedData);
    } catch (err) {
      console.error(err);
    } finally {
      // setUrl("");
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
      {/* <div className="row">
        {result.map((photo) => (
          <div className="col-sm-4" key={photo.id}>
            <a href={photo.urls.full} target="_blank">
              <Image
                blurDataURL="/blurimg.png"
                src={photo.urls.full}
                alt={photo.alt_description}
                className="imgfix"
                width={photo.width}
                height={photo.height}
                placeholder="blur"
                priority
              />
            </a>
          </div>
        ))}
      </div> */}
    </main>
  );
};

export default YoutubeContainer;
