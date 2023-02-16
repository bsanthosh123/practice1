const express = require("express")
const app = express();
app.use(express.json())
const fs = require('fs');
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/public"))

app.set('view engine','ejs')
app.get("/", (req, res) => {
    //console.log(req.url)
    res.sendFile("/index.html")
})
app.get("/new",(req,res)=>{
    res.render("exp.js",{
        
    })
})
app.post("/add", function (req, res) {
    Dateobj = new Date();
    req.body.date = Dateobj
    //res.send(req.body)
    console.log(req.body)//data collected from body i.e form web page
    
    fs.readFile("./items.json", "utf8", (err, jsonString) => {
            if (err) {
                console.log("File read failed:", err);
                return;
            }
            temp = JSON.parse(jsonString)//now it an object
            console.log(temp)
            temp.table.push(req.body)
            var newData = JSON.stringify(temp); //convert it back to json
            fs.writeFile('./items.json', newData, err => {  // write it back 
                // error checking
                if (err) throw err;
                console.log("New data added");
            });
            })
       
    //  res.redirect("/display")   
});




app.listen(3008)
