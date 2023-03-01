import React from "react";
import { useState } from "react";
const Table = ({ post, mealNumber }) => {
  const [mealType, setMealType] = useState("");
  const [dataId, setdataId] = useState();
  const getMealType = async (event) => {
    const { value, checked, id } = event.target;
    console.log(`${value} is ${checked}`);
    console.log(id);
    if (checked) {
      setMealType(value);
    } else {
      setMealType("");
    }
  };
  console.log(mealType);
  const getId = async (event) => {
    let id = event.target.getAttribute("id");
    setdataId(id);
    console.log(id);
    const data = { rowId: id, type: mealType, number: mealNumber };
    alert(`${id} Added to ${mealType} Successfully`);
    fetch("http://localhost:5000/api/get", {
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
  return (
    <tr key={post.id}>
      <td className="px-6 py-4 border border-slate-700 text-black text-center">
        <ul>
          <li>
            <div
              class={`flex items-center mr-4 ${
                mealNumber <= 2 && "scale-0 hidden"
              }`}
            >
              <input
                id={post.id}
                type="checkbox"
                value="Breakfast"
                checked={mealType === "Breakfast"}
                onChange={getMealType}
                // checked={ischecked}
                // onChange={handleClick}
                class="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="red-checkbox"
                class="ml-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Breakfast
              </label>
            </div>
          </li>
          <li>
            <div class="flex items-center mr-4">
              <input
                id={post.id}
                type="checkbox"
                value="Lunch"
                checked={mealType === "Lunch"}
                name="myCheckbox"
                onChange={getMealType}
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                for="green-checkbox"
                class="ml-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Lunch
              </label>
            </div>
          </li>
          <li>
            <div class="flex items-center mr-4">
              <input
                id={post.id}
                type="checkbox"
                value="Dinner"
                checked={mealType === "Dinner"}
                onChange={getMealType}
                class="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="purple-checkbox"
                class="ml-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Dinner
              </label>
            </div>
          </li>
          <li>
            <div
              className={`flex items-center mr-4 ${
                mealNumber <= 3 && "scale-0 hidden"
              }`}
            >
              <input
                id={post.id}
                type="checkbox"
                value="Evening Snacks"
                checked={mealType === "Evening Snaks"}
                onChange={getMealType}
                class="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="purple-checkbox"
                class="ml-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                ES
              </label>
            </div>
          </li>
          <li>
            <div
              className={`flex items-center mr-4 ${
                mealNumber <= 4 && "scale-0 hidden"
              }`}
            >
              <input
                id={post.id}
                type="checkbox"
                value="After Morning Snacks"
                checked={mealType === "After Morning Snaks"}
                onChange={getMealType}
                class="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="purple-checkbox"
                class="ml-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                AMS
              </label>
            </div>
          </li>
        </ul>
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
          Add
        </button>
      </td>
    </tr>
  );
};

export default Table;
