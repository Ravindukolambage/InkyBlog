import React, { Fragment, useState } from "react";
import Navbar from "../components/HeaderContent/Navbar";
import Banner from "../components/Banner/Banner";
import BlogCardList from "../components/BlogCardList/BlogCardList";
import SearchBar from "../components/SearchBar/SearchBar";
import SearchResult from "../components/SearchBar/SearchResult";


const Home = () => {
  const [result, setResult] = useState([]);

  return (
    <Fragment>
      <div className="w-full min-h-screen bg-slate-950">
        <div className="fixed top-0 left-0 w-full z-20">
          <Navbar />
        </div>
        <div className="pt-15">
          <Banner />
        </div>
        <div className="flex justify-center flax-col mt-10 w-full min-w-[350px]">
          <div>
            <SearchBar setResults={setResult} />
            <SearchResult results={result} />
          </div>
        </div>
        <div>
          <BlogCardList />
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
