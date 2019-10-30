//jshint esversion: 6

const express = require('express');
const request = require("request");
const bodyParse = require('body-parser');

const app = express();

app.use(bodyParse.urlencoded({extended:true}));

app.listen(2999, function(){
  console.log("Server started at port 2999");
});

app.get("/", function(req, res){
  console.log("Get request recieved...");
  res.sendFile(__dirname + "/HTML/homepage.html");
});

app.post("/", function(req, res){
  console.log(req.body);

  request("https://apiv2.bitcoinaverage.com/indices/global/ticker/" + req.body.crypto + req.body.fiat, function(error, response, body){
    var data = JSON.parse(body);
    var resp = "The current price of the selected bitcoin is: " + req.body.fiat + " " + data.last + " at time " + data.display_timestamp;
    res.send("<h1>" + resp + "</h1>");
  });
});
