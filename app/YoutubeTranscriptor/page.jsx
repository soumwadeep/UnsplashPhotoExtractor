"use client";

import YoutubeContainer from "@/components/YoutubeContainer";
import YoutubeContainerUnofficial from "@/components/YoutubeContainerUnofficial";
import Link from "next/link";

const Home = () => {
  return (
    <div className="text-center">
      <h1>Welcome To Youtube Transcript Extractor</h1>
      <Link href="/" className="btn btn-info">
        Unsplash Image Extractor(New*)
      </Link>
      <p className="mt-4">
        Get The Captions Of Your Favourite Video Just By Typing Its URL In The
        Below Search Field
      </p>
      {/* <YoutubeContainer /> */}
      <YoutubeContainerUnofficial />
    </div>
  );
};

export default Home;
