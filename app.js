const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res){
    res.render("indexPage");
});
app.get("/login", function(req,res){
    res.render("login");
});
app.get("/signup", function(req,res){
    res.render("signup");
});
app.listen(3000,function(req,res){
    console.log("Server started on port 3000");
});