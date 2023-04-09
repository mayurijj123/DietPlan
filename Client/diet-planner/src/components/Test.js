import React from "react";
import { useState, useEffect, ChangeEvent } from "react";
import Table from "./Table";

const Test = ({ posts }) => {
  // const [dataId, setdataId] = useState();
  const [searchInput, setSearchInput] = useState("");
  const [data, setData] = useState([]);
  const [mealType, setMealType] = useState("");
  const [showMealOption, setShowMealOption] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);
  const [mealPlan, setMealPlan] = useState("2");
  const [clearResults, setClearResults] = useState("unclear");
  let mealNumber = parseInt(mealPlan, 10);

  const getMealPlan = (event) => {
    //to get the meal plan
    const { value, checked } = event.target;
    console.log(`${value} is ${checked}`);
    let data;
    if (!checked) {
      setMealPlan("");
      setShowMealOption(!showMealOption);
      data = { type: mealNumber };
    } else {
      setMealPlan(value);
      setItems(value);
      mealNumber = parseInt(value, 10);
      setShowMealOption(!showMealOption);
      data = { type: mealNumber };
      const resData = fetch("http://localhost:5000/api/meal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      let response = resData.json();
      if (!response) {
        console.warn("Error");
      } else {
        console.log("sent");
      }
    }
  };
  const [items, setItems] = useState("2"); //to send mealplan to favourites page

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  // console.log(mealType);
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
  const handleClearData = (event) => {
    let val = event.target.value;
    if (val === "clear") {
      let data = { type: val };
      const resData = fetch("http://localhost:5000/api/clear", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      alert("Data Cleared successfully!!!");
      let response = resData.json();
      if (!response) {
        console.warn("Error");
      } else {
        console.log("sent");
      }
    }
  };
  console.log(clearResults);
  return (
    <div className="overflow-x-hidden">
      <div className="lg:p-4 md:p-4 md:ml-44 p-2 m-4 lg:ml-[300px]  bg-[#FFD57F] rounded-xl w-60 lg:w-96 lg:grid lg:grid-cols-3 lg:items-center">
        {!showMealOption && (
          <div className="p-2 lg:w-40 font-bold text-center justify-self-center bg-[#FFB26B] lg:col-span-1 lg:col-start-2 rounded-xl">
            <button onClick={() => setShowMealOption(!showMealOption)}>
              Select Meal Plan
            </button>
          </div>
        )}
        {showMealOption && (
          <div className="lg:p-4  lg:m-4 lg:w-80 p-0 w-20 font-bold text-center justify-self-center lg:col-span-1 lg:col-start-2 rounded-xl">
            <ul class="lg:w-72 w-48 m-4 lg:m-0 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-[#FFB26B] dark:border-[#FFD57F] dark:text-black">
              <li class="w-full border-b border-gray-200 rounded-t-lg ">
                <div class="flex items-center pl-3">
                  <input
                    id="twoMeal-checkbox"
                    type="checkbox"
                    value="2"
                    checked={mealPlan === "2"}
                    name="myCheckbox"
                    onChange={getMealPlan}
                    class="w-4 h-4 lg:m-0 lg:w-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="twoMeal-checkbox"
                    class="w-full py-3 lg:ml-2 text-sm font-medium text-black"
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
                    class="w-4 h-4 lg:m-0 lg:w-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
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
                    class="w-4 h-4 lg:m-0 lg:w-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
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
                    class="w-4 h-4 lg:m-0 lg:w-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
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
        <div className="md:flex items-center lg:mt-12 lg:mb-2 lg:ml-4 lg:justify-right">
          <div className="md:flex flex md:ml-40 mt-8 border-purple-200 rounded">
            <input
              type="text"
              className="block w-40 lg:w-80 px-4 py-2 text-black bg-white  rounded-md focus:border-[#FFB26B] focus:ring-[#FFB26B] focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Search..."
              onChange={(e) => searchItems(e.target.value)}
            />
            <button className="px-4 py-2 flex ml-4 text-white dark:bg-[#FFD56F]  rounded ">
              Search
            </button>
          </div>
          <div className=" md:ml-20 mt-16 ml-12 mb-8 md:w-40">
            <button
              id="clearResults"
              value="clear"
              type="button"
              onClick={handleClearData}
              className="p-2 lg:flex text-white dark:bg-[#FFD56F] border-l rounded active:bg-transparent focus:outline-none  "
            >
              Delete Previous Diet
            </button>
          </div>
        </div>
      </div>

      <div class="relative">
        <table className="w-full text-xs text-left text-gray-500 font-bold dark:text-gray-400 border-collapse border border-slate-500 mt-8">
          {" "}
          <thead className=" text-white font-bold text-md uppercase bg-[#FFD57F] dark:bg-[#FFD56F] dark:text-black">
            <tr>
              <th className="md:px-6 py-3 px-2 border border-slate-600 md:w-[150px] ">
                ID
              </th>
              <th className="md:px-6 py-3 px-2 border border-slate-600 md:w-[122px] ">
                Food Name
              </th>
              <th className=" px-6 py-6 border border-slate-600 hidden lg:inline-flex md:w-[115px] ">
                Food Category
              </th>
              <th className="md:px-6 py-6 md:py-8 border border-slate-600 hidden lg:inline-flex md:w-[115px] ">
                Protiens(g)
              </th>
              <th className="md:px-6 py-6 md:py-8 border border-slate-600 hidden lg:inline-flex md:w-[115px]">
                Carbs(g)
              </th>
              <th className="md:px-6 py-6 md:py-8  border border-slate-600 hidden lg:inline-flex md:w-[115px]">
                Fats(g)
              </th>
              <th className="md:px-6 py-6 md:py-8 border border-slate-600 hidden lg:inline-flex md:w-[115px]">
                Calories
              </th>
              <th className="md:px-6 py-3 px-2 border border-slate-600 md:w-[100px]  ">
                Action
              </th>
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
    </div>
  );
};

export default Test;
