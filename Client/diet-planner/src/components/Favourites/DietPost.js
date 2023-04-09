import React from "react";
import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
const Posts = ({ posts }) => {
  const [data, setData] = useState([]);
  const [items, setItems] = useState([]);
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("items"));
    if (items) {
      setItems(items);
    }
  }, []);
  const meal = localStorage.getItem("Meal");
  console.log("Fav Meal Plan:", items);
  console.log("Current Meal:", meal);
  const [dataId, setdataId] = useState();
  const getId = async (event) => {
    let id = event.target.getAttribute("id");
    setdataId(id);
    console.log(id);
    alert(`${id} deleted from ${meal} `);
    const data = { rowId: id };
    event.preventDefault();
    fetch(`http://localhost:5000/api/${meal}`, {
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
  var x = localStorage.getItem("Meal");

  useEffect(() => {
    const loadData = async () => {
      const response = await fetch(`http://localhost:5000/api/${meal}`);
      const resData = await response.json();
      console.log(resData);
      setData(resData);

      console.log(resData);
    };
    loadData();
  }, [sumData()]);
  console.log(totalProteins, totalCalories, totalFats, totalCarbs);
  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape
    var image = new Image();
    image.src = "Images/Wellness.jpeg";
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);
    var img = "data:../../Images/wellness.jpg;base64,";
    doc.setFontSize(15);
    var fileTitle = "Hollistic Wellness care";
    doc.text(fileTitle, 30, 30);
    var x = localStorage.getItem("Meal");

    const title = `Diet Plan - ${x.toLocaleUpperCase()}`;
    const headers = [
      [
        "Food Name",
        "Food Category",
        "Protiens(g)",
        "Carbs(g)",
        "Fats(g)",
        "Calories",
      ],
    ];

    const data = posts.map((elt) => [
      elt.Food_Name,
      elt.Food_Category,
      elt.Proteins,
      elt.Carbohydrates,
      elt.Fats,
      elt.Total_Calories_In_KCal,
    ]);

    let content = {
      startY: 120,
      head: headers,
      body: data,
    };
    doc.addImage(image, "JPEG", 157, 10, 40, 20);
    doc.text(title, 250, 80);
    doc.autoTable(content);
    doc.save("report.pdf");
  };

  return (
    <div>
      <div>
        <table className="w-full text-xs text-left text-gray-500 font-bold dark:text-gray-400 border-collapse border border-slate-500 mt-8">
          {" "}
          <thead className=" text-white font-bold text-md uppercase bg-[#FFD57F] dark:bg-[#FFD56F] dark:text-black">
            <tr>
              <th className="md:px-6 py-3 px-2 border border-slate-600 md:w-[150px] ">
                {x}
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
              <th className="md:px-6 py-3 px-2 border border-slate-600 md:w-[100px] ">
                Action
              </th>
            </tr>
            <tr className="bg-white  ">
              <td className="md:px-6 py-3 px-2 border border-slate-600 md:w-[122px] text-black"></td>
              <td className="md:px-6 py-3 px-2 border border-slate-600 md:w-[122px] text-black">
                Total
              </td>
              <td className="px-6 py-6 border md:py-8 border-slate-600 hidden lg:inline-flex md:w-[115px] text-black">
                =
              </td>
              <td className="md:px-6 py-6 md:py-8 border border-slate-600 hidden lg:inline-flex md:w-[115px] text-black ">
                {totalProteins.toFixed(2)}
              </td>
              <td className="md:px-6 py-6 md:py-8 border border-slate-600 hidden lg:inline-flex md:w-[115px] text-black">
                {totalCarbs.toFixed(2)}
              </td>
              <td className="md:px-6 py-6 md:py-8  border border-slate-600 hidden lg:inline-flex md:w-[115px] text-black">
                {totalFats.toFixed(2)}
              </td>
              <td className="md:px-6 py-6 md:py-8 border border-slate-600 hidden lg:inline-flex md:w-[115px] text-black ">
                {totalCalories.toFixed(2)}
              </td>
              <td className="md:px-6 py-3 px-2 border border-slate-600 md:w-[100px]"></td>
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
                <td className="md:px-6 py-3 px-2 border border-slate-600 md:w-[122px] text-black">
                  {post.Food_Name}
                </td>
                <td className="px-6 py-6 border md:py-8 border-slate-600 hidden lg:inline-flex md:w-[115px] text-black ">
                  {post.Food_Category}
                </td>
                <td className="md:px-6 py-6 md:py-8 border border-slate-600 hidden lg:inline-flex md:w-[115px] text-black ">
                  {post.Proteins}
                </td>
                <td className="md:px-6 py-6 md:py-8 border border-slate-600 hidden lg:inline-flex md:w-[115px] text-black">
                  {post.Carbohydrates}
                </td>
                <td className="md:px-6 py-6 md:py-8  border border-slate-600 hidden lg:inline-flex md:w-[115px] text-black">
                  {post.Fats}
                </td>
                <td className="md:px-6 py-6 md:py-8 border border-slate-600 hidden lg:inline-flex md:w-[115px] text-black">
                  {post.Total_Calories_In_KCal}
                </td>
                <td className="md:px-6 py-3 px-2 border border-slate-600 md:w-[100px] ">
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
      <div>
        <button
          className="items-center mt-8 md:w-40 md:ml-56 lg:ml-96 lg:p-2 lg:w-40 justify-center p-2 mx-16 text-base font-bold text-black dark:bg-[#FFD56F]  border border-yellow-600 rounded-lg dark:text-black hover:bg-white dark:hover:bg-white "
          onClick={() => exportPDF()}
        >
          Generate Pdf
        </button>
      </div>
    </div>
  );
};

export default Posts;
