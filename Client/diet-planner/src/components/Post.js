import React from "react";
import { useState, useEffect, ChangeEvent } from "react";
import Table from "./Table";

const Posts = ({ posts }) => {
  // const [dataId, setdataId] = useState();
  const [searchInput, setSearchInput] = useState("");
  const [data, setData] = useState([]);
  const [mealType, setMealType] = useState("");
  const [showMealOption, setShowMealOption] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);
  const [mealPlan, setMealPlan] = useState("3");
  // const [ischecked, setChecked] = useState(false);
  // const getId = async (event) => {
  //   let id = event.target.getAttribute("id");
  //   setdataId(id);
  //   console.log(id);
  //   const data = { rowId: id, type: mealType, number: mealNumber };
  //   fetch("http://localhost:5000/api/get", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("Success:", data);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // };
  const mealNumber = parseInt(mealPlan, 10);
  const getMealPlan = async (event) => {
    const { value, checked } = event.target;
    console.log(`${value} is ${checked}`);

    setMealPlan(value);
    setShowMealOption(!showMealOption);
  };
  // console.log(mealPlan);
  // const getMealType = async (event) => {
  //   const { value, checked, id } = event.target;
  //   console.log(`${value} is ${checked}`);
  //   console.log(id);
  //   if (checked) {
  //     setMealType(value);
  //   }
  // };
  // const handleClick = () => {
  //   setChecked(!ischecked);
  // };
  console.log(mealType);
  useEffect(() => {
    const loadData = async () => {
      const response = await fetch("http://localhost:5000/api/get");
      const resData = await response.json();
      console.log(resData);
      setData(resData);

      console.log(resData);
    };
    loadData();
  }, []);
  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    // console.log(searchValue);
    if (searchInput !== "") {
      const filteredData = data.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      // console.log(filteredData);
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(data);
    }
  };

  return (
    <div>
      <div className="p-4 ml-56 m-8 bg-[#FFD57F] rounded-xl w-96 grid grid-cols-3 items-center">
        {!showMealOption && (
          <div className="p-2 w-40 font-bold text-center justify-self-center bg-[#FFB26B] col-span-1 col-start-2 rounded-xl">
            <button onClick={() => setShowMealOption(!showMealOption)}>
              Select Meal Plan
            </button>
          </div>
        )}
        {showMealOption && (
          <div className="p-2 w-40 font-bold text-center justify-self-center  col-span-1 col-start-2 rounded-xl">
            <ul class="w-48 mr-32 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-[#FFB26B] dark:border-[#FFD57F] dark:text-black">
              <li class="w-full border-b border-gray-200 rounded-t-lg ">
                <div class="flex items-center pl-3">
                  <input
                    id="twoMeal-checkbox"
                    type="checkbox"
                    value="2"
                    checked={mealPlan === "2"}
                    name="myCheckbox"
                    onChange={getMealPlan}
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="twoMeal-checkbox"
                    class="w-full py-3 ml-2 text-sm font-medium text-black"
                  >
                    Two Meal Plan{" "}
                  </label>
                </div>
              </li>
              <li class="w-full border-b border-gray-200 rounded-t-lg ">
                <div class="flex items-center pl-3">
                  <input
                    id="react-checkbox"
                    type="checkbox"
                    value="3"
                    checked={mealPlan === "3"}
                    name="myCheckbox"
                    onChange={getMealPlan}
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="react-checkbox"
                    class="w-full py-3 ml-2 text-sm font-medium text-black "
                  >
                    Three Meal Plan
                  </label>
                </div>
              </li>
              <li class="w-full border-b border-gray-200 rounded-t-lg ">
                <div class="flex items-center pl-3">
                  <input
                    id="angular-checkbox"
                    type="checkbox"
                    value="4"
                    checked={mealPlan === "4"}
                    name="myCheckbox"
                    onChange={getMealPlan}
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="angular-checkbox"
                    class="w-full py-3 ml-2 text-sm font-medium text-black "
                  >
                    Four Meal Plan
                  </label>
                </div>
              </li>
              <li class="w-full border-b border-gray-200 rounded-t-lg ">
                <div class="flex items-center pl-3">
                  <input
                    id="fiveMeal-checkbox"
                    type="checkbox"
                    value="5"
                    checked={mealPlan === "5"}
                    name="myCheckbox"
                    onChange={getMealPlan}
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="laravel-checkbox"
                    class="w-full py-3 ml-2 text-sm font-medium text-black"
                  >
                    Five Meal Plan
                  </label>
                </div>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div>
        <div className="flex items-center mt-12 mb-2 justify-right">
          <div className="flex border border-purple-200 rounded">
            <input
              type="text"
              className="block w-full px-4 py-2 text-black bg-white border rounded-md focus:border-[#FFB26B] focus:ring-[#FFB26B] focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Search..."
              onChange={(e) => searchItems(e.target.value)}
            />
            <button className="px-4 text-white dark:bg-[#FFD56F] border-l rounded ">
              Search
            </button>
          </div>
        </div>
      </div>
      <table className="w-full text-xs text-left text-gray-500 font-bold dark:text-gray-400 border-collapse border border-slate-500 mt-8">
        {" "}
        <thead className=" text-white font-bold text-md uppercase bg-[#FFD57F] dark:bg-[#FFD56F] dark:text-black">
          <tr>
            <th className="px-6 py-3 border border-slate-600">ID</th>
            <th className="px-6 py-3 border border-slate-600">Food Name</th>
            <th className="px-6 py-3 border border-slate-600">Food Category</th>
            <th className="px-6 py-3 border border-slate-600">Protiens(g)</th>
            <th className="px-6 py-3 border border-slate-600">Carbs(g)</th>
            <th className="px-6 py-3 border border-slate-600">Fats(g)</th>
            <th className="px-6 py-3 border border-slate-600">Calories</th>
            <th className="px-6 py-3 border border-slate-600">Action</th>
          </tr>
        </thead>
        <tbody>
          {searchInput.length > 1
            ? filteredResults.map((post) => {
                return <Table post={post} mealNumber={mealNumber} />;
              })
            : posts.map((post) => {
                return <Table post={post} mealNumber={mealNumber} />;
              })}
        </tbody>
      </table>
    </div>
  );
};

export default Posts;
