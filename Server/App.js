const express = require("express");
const app = express();
const db = require("./config/db");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const sqlGet = "SELECT * FROM food_nutrients";
  db.query(sqlGet, (error, result) => {
    res.send(result);
  });
  app.get("/", (req, res) => {});
});

let rowid;
let someVar;
let mealtype;
let mealNumber;
app.post("/api/get", (req, res) => {
  rowid = req.body.rowId;
  mealtype = req.body.type;
  mealNumber = req.body.number;
  console.log(mealtype);
  console.log(rowid);
  const rowData = "SELECT * FROM food_nutrients WHERE id=?";
  db.query(rowData, rowid, function (err, rows) {
    if (err) {
      throw err;
    } else {
      someVar = rows;
      console.log(someVar);
      const resultData = Object.values(someVar[0]);
      console.log(resultData);
      const dietQuery =
        "INSERT INTO diet_schedule (id,Food_Code,Food_Category,Food_Name,Moisture,Proteins,Ash,Fats,Total_Fiber,Insoluble_Fiber,Soluble_Fiber,Carbohydrates,Total_Calories_In_KJules,Total_Calories_In_KCal) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

      db.query(dietQuery, resultData, (error, result) => {
        res.send(result);
      });
      // if (mealtype === "Breakfast") {
      //   const dietQuery =
      //     "INSERT INTO breakfast (id,Food_Code,Food_Category,Food_Name,Moisture,Proteins,Ash,Fats,Total_Fiber,Insoluble_Fiber,Soluble_Fiber,Carbohydrates,Total_Calories_In_KJules,Total_Calories_In_KCal) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

      //   db.query(dietQuery, resultData, (error, result) => {
      //     res.send(result);
      //   });
      // }
      // if (mealtype === "Lunch") {
      //   const dietQuery =
      //     "INSERT INTO lunch (id,Food_Code,Food_Category,Food_Name,Moisture,Proteins,Ash,Fats,Total_Fiber,Insoluble_Fiber,Soluble_Fiber,Carbohydrates,Total_Calories_In_KJules,Total_Calories_In_KCal) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

      //   db.query(dietQuery, resultData, (error, result) => {
      //     res.send(result);
      //   });
      // }
      // if (mealtype === "Dinner") {
      //   const dietQuery =
      //     "INSERT INTO dinner (id,Food_Code,Food_Category,Food_Name,Moisture,Proteins,Ash,Fats,Total_Fiber,Insoluble_Fiber,Soluble_Fiber,Carbohydrates,Total_Calories_In_KJules,Total_Calories_In_KCal) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

      //   db.query(dietQuery, resultData, (error, result) => {
      //     res.send(result);
      //   });
      // }
    }
  });

  app.get("/", (req, res) => {});
});

app.get("/api/diet", (req, res) => {
  const sqlGetDiet = "SELECT * FROM diet_schedule";
  db.query(sqlGetDiet, (error, result) => {
    res.send(result);
  });
  app.get("/", (req, res) => {});
});
app.post("/api/diet", (req, res) => {
  rowid = req.body.rowId;
  console.log(rowid);
  const rowData = "DELETE FROM diet_schedule WHERE id=?";
  db.query(rowData, rowid, function (err, rows) {
    if (err) {
      throw err;
    } else {
      console.log("Deleted row :", rowid);
    }
  });

  app.get("/", (req, res) => {});
});

app.listen(5000, () => {
  console.log(`Server is running on 5000`);
});
