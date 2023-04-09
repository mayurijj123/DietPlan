import React from "react";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import {
  PieChart,
  Pie,
  LabelList,
  Legend,
  Sector,
  Cell,
  ResponsiveContainer,
} from "recharts";

const Analytics = () => {
  const [data, setData] = useState([]);
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
  const chartdata = [
    { name: `Protiens : ${totalProteins.toFixed(2)}`, students: totalProteins },
    { name: `Carbohydrates : ${totalCarbs.toFixed(2)}`, students: totalCarbs },
    { name: `Fats : ${totalFats.toFixed(2)}`, students: totalFats },
    { name: `Calories : ${totalCalories.toFixed(2)}`, students: totalCalories },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="right"
        alignmentBaseline="bottom"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  let renderLabel = function (entry) {
    return entry.name;
  };
  return (
    <div className="flex">
      <div>
        <Sidebar />
      </div>

      <div className="flex-1 p-8 w-64 mt-0 bg-fixed">
        <ResponsiveContainer width="100%" height="100%" className="text-center">
          <PieChart>
            <Legend
              layout="horizontal"
              verticalAlign="top"
              align="top"
              // position="relative"
            />
            <Pie
              data={chartdata}
              dataKey="students"
              outerRadius={180}
              fill="green"
              labelLine={true}
              // label={renderCustomizedLabel}
              label={renderLabel}
            >
              <LabelList content={renderCustomizedLabel} position="insideTop" />

              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;
