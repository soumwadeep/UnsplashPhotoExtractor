import SearchContainer from "@/components/SearchContainer";

const Home = () => {
  return (
    <div className="text-center">
      <h1>Welcome To Unsplash Photo Extractor</h1>
      <p>
        Search Your Favourite Photos Just By Typing About It In The Below Search
        Field
      </p>
      <SearchContainer />
    </div>
  );
};

export default Home;
