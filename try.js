const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
const fs = require("fs");
const { Script } = require("vm");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");
app.get("/", (req, res) => {
  //console.log(req.url)
  res.send(`<script>window.location("/")</script>`);
});
app.get("/new", (req, res) => {
  res.render("exp.js", {});
});
app.get("/data", (req, res) => {
  fs.readFile("./items.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }
    temp = JSON.parse(jsonString);
    // console.log(temp);
    res.send(temp);
  });
});
app.post("/add", function (req, res) {
  Dateobj = new Date();
  req.body.data.date = Dateobj;
  //res.send(req.body)
//   console.log(req.body); //data collected from body i.e form web page

  fs.readFile("./items.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }
    temp = JSON.parse(jsonString); //now it an object
    temp.table.push(req.body.data);
    var newData = JSON.stringify(temp); //convert it back to json
    fs.writeFile("./items.json", newData, (err) => {
      // write it back
      // error checking
      if (err) throw err;
      console.log("New data added");
    });
  });
  res.redirect("/")
});

app.listen(3008);
