// const fs = require('fs')

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




let data = {}
let food = 0;
let investment = 0;
let entertainment = 0;
let bills = 0;
let rent = 0;
let others = 0;
let totalexpenses = 0;

document.getElementById('submit').onclick = () => {
    // let form_ele = document.querySelector("form")
    // let formData = new FormData(form_ele)
    fetch("../items.json")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            expenses = data.table;
            for (var i in expenses) {
                var formData = expenses[i]
                console.log(formData)
                // formData.forEach((label, key) => (data[key] = label));

                // if (data.category != 'chooseOne' && data.amount != '' && data.name != "") {
                //     let new_row = document.createElement("tr")
                //     new_row.innerHTML = `</td><td>${data.category}</td><td>${data.name}</td><td>${data.amount}`
                //     document.getElementById("table").appendChild(new_row)


                //     if (data['category'] == "food") {
                //         food += parseInt(data['amount'])

                //     }
                //     else if (data['category'] == "investment") {
                //         investment += parseInt(data['amount'])
                //     }
                //     else if (data['category'] == "entertainment") {
                //         entertainment += parseInt(data['amount'])
                //     }
                //     else if (data['category'] == "bills") {
                //         bills += parseInt(data['amount'])
                //     }
                //     else if (data['category'] == "rent") {
                //         rent += parseInt(data['amount'])
                //     }
                //     else {
                //         others += parseInt(data['amount'])
                //     }
                //     totalexpenses = food + entertainment + bills + rent + others + investment;

                //     document.getElementById("tfoot").innerHTML = totalexpenses
                //     document.querySelector("#name").value = ''
                //     document.querySelector("#amount").value = ''
                //     document.querySelector("#type").value = 'chooseOne'
                //     // document.dataform.submit()
                // }
            }
        })

}

function show() {
    var chart = new CanvasJS.Chart("container", {
        animationEnabled: true,
        title: {
            text: `total expenditure ${totalexpenses}`
        },
        data: [{
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

            ]
        }]
    });
    chart.render();

}
