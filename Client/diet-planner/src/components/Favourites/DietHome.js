import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar";
import DietPagination from "./DietPagination";
import DietPost from "./DietPost";
const Home = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [posts, setPosts] = useState([]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginateFront = () => setCurrentPage(currentPage + 1);
  const paginateBack = () => setCurrentPage(currentPage - 1);

  useEffect(() => {
    const loadData = async () => {
      const response = await fetch("http://localhost:5000/api/diet");
      const resData = await response.json();
      console.log(resData);
      setData(resData);
      setPosts(resData);

      console.log(resData);
    };
    loadData();
  }, []);
  return (
    <>
      <div className="flex">
        <div>
          <Sidebar />
        </div>
        <div className="flex-1 relative overflow-x-auto mt-5 ml-20 mr-16">
          <div className="flex items-center mt-5 justify-right">
            <div className="flex border border-purple-200 rounded">
              <input
                type="text"
                className="block w-full px-4 py-2 text-black bg-white border rounded-md focus:border-[#FFB26B] focus:ring-[#FFB26B] focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Search..."
              />
              <button className="px-4 text-white dark:bg-[#FFD56F] border-l rounded ">
                Search
              </button>
            </div>
          </div>
          <DietPost posts={currentPosts} />
          <DietPagination
            postsPerPage={postsPerPage}
            totalPosts={data.length}
            paginateBack={paginateBack}
            paginateFront={paginateFront}
            currentPage={currentPage}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
