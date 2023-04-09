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
  const [type, setType] = useState("breakfast");
  const [length, setLength] = useState();
  const [url, setURL] = useState(`http://localhost:5000/api/${type}`);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

  const paginateFront = () => setCurrentPage(currentPage + 1);
  const paginateBack = () => setCurrentPage(currentPage - 1);

  useEffect(() => {
    const loadData = async () => {
      const response = await fetch(url);
      const resData = await response.json();
      console.log(resData);
      setData(resData);
      setPosts(resData);
    };
    loadData();
  }, [url]);
  const handleOnClick = async (e) => {
    let type = e.target.value;
    setType(e.target.value);
    localStorage.setItem("Meal", e.target.value);
    setURL(`http://localhost:5000/api/${type}`);
    console.log(url);
    const response = await fetch(url);
    const resData = await response.json();
    setData(resData);
    setPosts(resData);
  };

  return (
    <>
      <div className="flex">
        <div>
          <Sidebar />
        </div>
        <div className="lg:flex-1 relative overflow-x-auto mt-5 ml-20 mr-16">
          <div className="lg:flex items-center mt-5 justify-right ">
            <div className="md:flex flex rounded md:ml-20">
              <input
                type="text"
                className="block w-44 md:w-60  px-4 py-2 text-black bg-white border rounded-md focus:border-[#FFB26B] focus:ring-[#FFB26B] focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Search..."
              />
              <button className="px-4 text-black md:mr-20 dark:bg-[#FFD56F] border-l rounded ">
                Search
              </button>
            </div>
            <div className=" md:flex md:mr-40 md:ml-28 bg-[#FFD56F] dark:bg-[#FFD56F] px-2 py-2  mt-4 rounded">
              <button
                value="breakfast"
                id="breakfast"
                onClick={handleOnClick}
                className="items-center p-2 mx-1 text-base font-bold text-black rounded-lg dark:text-black hover:bg-white dark:hover:bg-white "
              >
                Breakfast
              </button>
              <button
                value="lunch"
                id="lunch"
                onClick={handleOnClick}
                className="items-center p-2 text-base font-bold text-black rounded-lg dark:text-black hover:bg-white dark:hover:bg-white"
              >
                Lunch
              </button>
              <button
                value="dinner"
                id="dinner"
                onClick={handleOnClick}
                className="items-center p-2 mx-1 text-base font-bold text-black rounded-lg dark:text-black hover:bg-white dark:hover:bg-white"
              >
                Dinner
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
