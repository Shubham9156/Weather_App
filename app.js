const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){
    const query = req.body.cityName
    const apiKey = "3d7488335a33000243aa1a980b293850"
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
    
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const weatherDesciption = weatherData.weather[0].desciption
            const icon = weatherData.weather[0].icon
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<p>The weather is currently " + weatherDesciption + "<p>");
            res.write("<h1>The temperature in " + query + " is " + temp + "degree Celcius.</h1>" );
            res.write("<img src=" + imageURL +">");
            res.send()
        })
    })
})

    


app.listen(3000, function() {
    console.log("Server is running on port 3000.")
})