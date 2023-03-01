import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Pagination from "./Pagination";
import Post from "./Post";
import Test from "./Test";
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
      const response = await fetch("http://localhost:5000/api/get");
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
        <div className="">
          <Sidebar />
        </div>
        <div className="flex-1 relative overflow-x-auto mt-5 ml-20 mr-16">
          <Test posts={currentPosts} />
          <Pagination
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
