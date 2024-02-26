import SearchContainer from "@/components/SearchContainer";
import Link from "next/link";

const Home = () => {
  return (
    <div className="text-center">
      <h1>Welcome To Unsplash Photo Extractor</h1>
      <a href="https://yttranscriptor.soumwadeepguha.com/" target="_blank" className="btn btn-info">
        Youtube Transcript Extractor(New*)
      </a>
      <p className="mt-4">
        Search Your Favourite Photos Just By Typing About It In The Below Search
        Field
      </p>
      <SearchContainer />
    </div>
  );
};

export default Home;
