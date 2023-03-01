const express = require("express");
const app = express();
const db = require("./config/db");
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  //for total display
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

app.post("/api/meal", (req, res) => {
  //for meal type like 2 meal plan ,three meal plan etc...
  try {
    mealNumber = req.body.type;
    console.log("Type of Meal :", mealNumber);
  } catch (error) {
    console.log(error);
  }
});
app.post("/api/get", (req, res) => {
  //for adding data to the one of breakfast ,lunch,dinner table
  rowid = req.body.rowId;
  mealtype = req.body.type;
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
      // const dietQuery =
      //   "INSERT INTO diet_schedule (id,Food_Code,Food_Category,Food_Name,Moisture,Proteins,Ash,Fats,Total_Fiber,Insoluble_Fiber,Soluble_Fiber,Carbohydrates,Total_Calories_In_KJules,Total_Calories_In_KCal) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

      // db.query(dietQuery, resultData, (error, result) => {
      //   res.send(result);
      // });
      if (mealtype === "Breakfast") {
        const dietQuery =
          "INSERT INTO breakfast (id,Food_Code,Food_Category,Food_Name,Moisture,Proteins,Ash,Fats,Total_Fiber,Insoluble_Fiber,Soluble_Fiber,Carbohydrates,Total_Calories_In_KJules,Total_Calories_In_KCal) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

        db.query(dietQuery, resultData, (error, result) => {
          res.send(result);
          console.log("Added to Breakfast Successfully");
        });
      }
      if (mealtype === "Lunch") {
        const dietQuery =
          "INSERT INTO lunch (id,Food_Code,Food_Category,Food_Name,Moisture,Proteins,Ash,Fats,Total_Fiber,Insoluble_Fiber,Soluble_Fiber,Carbohydrates,Total_Calories_In_KJules,Total_Calories_In_KCal) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

        db.query(dietQuery, resultData, (error, result) => {
          res.send(result);
        });
      }
      if (mealtype === "Dinner") {
        const dietQuery =
          "INSERT INTO dinner (id,Food_Code,Food_Category,Food_Name,Moisture,Proteins,Ash,Fats,Total_Fiber,Insoluble_Fiber,Soluble_Fiber,Carbohydrates,Total_Calories_In_KJules,Total_Calories_In_KCal) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

        db.query(dietQuery, resultData, (error, result) => {
          res.send(result);
        });
      }
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

app.get("/api/breakfast", (req, res) => {
  const sqlGetDiet = "SELECT * FROM breakfast";
  db.query(sqlGetDiet, (error, result) => {
    res.send(result);
  });
  app.get("/", (req, res) => {});
});

app.get("/api/lunch", (req, res) => {
  const sqlGetDiet = "SELECT * FROM lunch";
  db.query(sqlGetDiet, (error, result) => {
    res.send(result);
  });
  app.get("/", (req, res) => {});
});

app.get("/api/dinner", (req, res) => {
  const sqlGetDiet = "SELECT * FROM dinner";
  db.query(sqlGetDiet, (error, result) => {
    res.send(result);
  });
  app.get("/", (req, res) => {});
});

app.post("/api/clear", (req, res) => {
  let decision = req.body.type;
  // console.log(decision);
  const clearQuery =
    "DELETE breakfast.*,dinner.*,lunch.* FROM breakfast,dinner,lunch";
  db.query(clearQuery, function (err, rows) {
    if (err) {
      throw err;
    } else {
      console.log("Deleted all data");
    }
  });
});
app.post("/api/breakfast", (req, res) => {
  //for deletion
  rowid = req.body.rowId;
  console.log(rowid);
  const rowData = "DELETE FROM breakfast WHERE id=?";
  db.query(rowData, rowid, function (err, rows) {
    if (err) {
      throw err;
    } else {
      console.log("Deleted row from breakfast :", rowid);
    }
  });

  app.get("/", (req, res) => {});
});

app.post("/api/lunch", (req, res) => {
  //for deletion
  rowid = req.body.rowId;
  console.log(rowid);
  const rowData = "DELETE FROM lunch WHERE id=?";
  db.query(rowData, rowid, function (err, rows) {
    if (err) {
      throw err;
    } else {
      console.log("Deleted row from lunch :", rowid);
    }
  });

  app.get("/", (req, res) => {});
});
app.post("/api/dinner", (req, res) => {
  //for deletion
  rowid = req.body.rowId;
  console.log(rowid);
  const rowData = "DELETE FROM dinner WHERE id=?";
  db.query(rowData, rowid, function (err, rows) {
    if (err) {
      throw err;
    } else {
      console.log("Deleted row from dinner :", rowid);
    }
  });

  app.get("/", (req, res) => {});
});
app.listen(5000, () => {
  console.log(`Server is running on 5000`);
});
