import React from "react";
import { useState, useEffect } from "react";

const Posts = ({ posts }) => {
  const [data, setData] = useState([]);

  const [dataId, setdataId] = useState();
  const getId = async (event) => {
    let id = event.target.getAttribute("id");
    setdataId(id);
    console.log(id);
    const data = { rowId: id };
    event.preventDefault();
    fetch("http://localhost:5000/api/diet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  useEffect(() => {
    const loadData = async () => {
      const response = await fetch("http://localhost:5000/api/diet");
      const resData = await response.json();
      console.log(resData);
      setData(resData);

      console.log(resData);
    };
    loadData();
  }, []);
  var totalProteins = 0;
  var totalCarbs = 0;
  var totalFats = 0;
  var totalCalories = 0;
  const sumData = async () => {
    for (var i = 0; i < data.length; i++) {
      totalProteins += data[i].Proteins;
      totalCalories += data[i].Total_Calories_In_KCal;
      totalFats += data[i].Fats;
      totalCarbs += data[i].Carbohydrates;
    }
  };
  sumData();
  console.log(totalProteins, totalCalories, totalFats, totalCarbs);
  return (
    <div>
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
          <tr className="bg-white">
            <td className="px-6 py-4 border border-slate-700 text-black text-center">
              -
            </td>
            <td className="px-6 py-4 border border-slate-700 text-black text-center">
              Total
            </td>
            <td className="px-6 py-4 border border-slate-700 text-black text-center">
              -
            </td>
            <td className="px-6 py-4 border border-slate-700 text-black text-center">
              {totalProteins.toFixed(2)}
            </td>
            <td className="px-6 py-4 border border-slate-700 text-black text-center">
              {totalCarbs.toFixed(2)}
            </td>
            <td className="px-6 py-4 border border-slate-700 text-black text-center">
              {totalFats.toFixed(2)}
            </td>
            <td className="px-6 py-4 border border-slate-700 text-black text-center">
              {totalCalories.toFixed(2)}
            </td>
            <td className="px-6 py-4 border border-slate-700 text-black text-center"></td>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td className="px-6 py-4 border border-slate-700 text-black text-center">
                <input
                  id="link-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </td>
              <td className="px-6 py-4 border border-slate-700 text-black text-center">
                {post.Food_Name}
              </td>
              <td className="px-6 py-4 border border-slate-700 text-black text-center">
                {post.Food_Category}
              </td>
              <td className="px-6 py-4 border border-slate-700 text-black text-center">
                {post.Proteins}
              </td>
              <td className="px-6 py-4 border border-slate-700 text-black text-center">
                {post.Carbohydrates}
              </td>
              <td className="px-6 py-4 border border-slate-700 text-black text-center">
                {post.Fats}
              </td>
              <td className="px-6 py-4 border border-slate-700 text-black text-center">
                {post.Total_Calories_In_KCal}
              </td>
              <td className="px-6 py-4 border border-slate-700 text-black text-center">
                <button
                  id={post.id}
                  onClick={getId}
                  value={dataId}
                  className="font-medium  text-black dark:text-black hover:underline"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Posts;
