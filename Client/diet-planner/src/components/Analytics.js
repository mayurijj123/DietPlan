import React from "react";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import {
  PieChart,
  Pie,
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
    { name: `Protiens : ${totalProteins}`, students: totalProteins },
    { name: `Carbohydrates : ${totalCarbs}`, students: totalCarbs },
    { name: `Fats : ${totalFats}`, students: totalFats },
    { name: `Calories : ${totalCalories}`, students: totalCalories },
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
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="flex">
      <div>
        <Sidebar />
      </div>
      <div className="flex-1 p-8">
        <ResponsiveContainer className="text-center">
          <PieChart width={700} height={700}>
            <Legend layout="vertical" verticalAlign="top" align="top" />
            <Pie
              data={chartdata}
              dataKey="students"
              outerRadius={150}
              fill="green"
              label={renderCustomizedLabel}
            >
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
