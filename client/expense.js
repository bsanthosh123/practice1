// const fs = require('fs')

// const { response } = require("express");

// fs.readFile("../items.json", "utf8", (err, jsonString) => {
//     if (err) {
//         console.log("File read failed:", err);
//         return;
//     }
//     temp = JSON.parse(jsonString)//now it an object
//     console.log(temp)

//     var newData = JSON.stringify(temp.table);
//     console.log(newData)
// })
const endpoint = "http://192.168.1.17:3008/";
let data = {};
let food = 0;
let investment = 0;
let entertainment = 0;
let bills = 0;
let rent = 0;
let others = 0;
let totalexpenses = 0;
const tableBody = document.getElementById("expenseTable");
const loadTable = (data) => {
  tableBody.innerHTML = "";
  data?.table.map((ele, index) => {
    if (ele["category"] == "food") {
      food += parseInt(ele["amount"]);
    } else if (ele["category"] == "investment") {
      investment += parseInt(ele["amount"]);
    } else if (ele["category"] == "entertainment") {
      entertainment += parseInt(ele["amount"]);
    } else if (ele["category"] == "bills") {
      bills += parseInt(ele["amount"]);
    } else if (ele["category"] == "rent") {
      rent += parseInt(ele["amount"]);
    } else {
      others += parseInt(ele["amount"]);
    }
    totalexpenses = food + entertainment + bills + rent + others + investment;

    let new_row = document.createElement("tr");
    new_row.innerHTML = `<td>${index + 1}</td><td>${ele.category}</td><td>${
      ele.name
    }</td><td>${ele.amount}</td><td colspan="3">${ele.date}</td>`;
    tableBody.appendChild(new_row);
  });
  document.getElementById("totalExpense").innerHTML = totalexpenses;
  document.getElementById("totalExpense").style.background = "#0f0";
  document.getElementById("totalExpense").style.color = "#000";
};
(async function () {
  await fetch(endpoint + "data")
    .then((response) => response.json())
    .then((data) => loadTable(data))
    .catch(console.log("Unable to fetch"));
})();

function show() {
  var chart = new CanvasJS.Chart("container", {
    animationEnabled: true,
    title: {
      text: `total expenditure ${totalexpenses}`,
    },
    data: [
      {
        type: "pie",
        startAngle: 240,
        indexLabel: "{label} {y}",
        dataPoints: [
          { y: food, label: "food" },
          { y: investment, label: "investments" },
          { y: bills, label: "bills" },
          { y: entertainment, label: "Entertainment" },
          { y: rent, label: "rent" },
          { y: others, label: "other" },
        ],
      },
    ],
  });
  chart.render();
}

document.getElementById("submit").addEventListener("click", async () => {
  let formData = new FormData(document.querySelector("form"));
  let tempData = {};
  formData.forEach((value, lable) => {
    tempData[lable] = value;
  });
  await fetch(endpoint + "add", {
    method: "POST",
    body: JSON.stringify({
      data: tempData
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then(() => {
    window.location.reload();
  });
});
