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

app.use(
    session({
      secret: "Mysecret",
      resave: false,
      saveUninitialized: false,
    })
  );
  
  app.use(passport.initialize());
  app.use(passport.session());
  
  mongoose.connect("mongodb://localhost:27017/moodDB", {
    useNewUrlParser: true,
  });

  const userSchema = new mongoose.Schema({
    username: String,
    Birthday: String,
    Gender: String,
    email: String,
    password: String,
    PhoneNumber: String
  });

  
  
  userSchema.plugin(passportLocalMongoose);
  
  const User = new mongoose.model("User", userSchema);
    
  passport.use(User.createStrategy());
  
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user){
      done(err, user);
    });
  });

app.get("/", function (req, res){
    res.render("indexPage");
});
app.get("/login", function(req,res){
    res.render("login");
});
app.get("/signup", function(req,res){
    res.render("signup");
});
app.get("/record",function(req,res){
  res.render("recordervid");
});
app.get("/forms",function(req,res){
  res.render("form");
});
app.get("/dashboard",function(req,res){

    if (req.isAuthenticated()) {
      console.log(req.user);
      res.render("Userhome", {user: req.user});
    } else {
      res.redirect("/login");
    }
  });
  app.post("/signup", function(req,res){
    res.redirect("signup");
})
app.post("/login", function(req,res){
    res.redirect("login");
})
app.post("/register", function (req, res) {
   // console.log(req.body.username);
  
    User.register(
      {
        username: req.body.username,
        Birthday: req.body.birthday,
        Gender: req.body.gender,
        email: req.body.email,
        password: req.body.password,
        PhoneNumber: req.body.phone
      },
      req.body.password,
      function (err, user){
        if (err) {
          console.log(err);
          res.redirect("/signup");
        } else {
          passport.authenticate("local")(req, res, function () {
            res.redirect("/dashboard");
          });
        }
      }
    );
  });
  app.post("/log", function (req, res) {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
    });
    //console.log("errors");
    req.login(user, function (err) {
      if (err) {
        //console.log("error");
        console.log(err);
      } else {
        passport.authenticate("local")(req, res, function () {
          res.redirect("/dashboard");
        });
      }
    });
  });
  app.post("/record",function(req,res){
    console.log("hi");
    res.redirect("/record");
  })
  app.post("/forms",function(req,res){
    console.log("hi");
    res.redirect("/forms");
  })
app.listen(3000,function(req,res){
    console.log("Server started on port 3000");
});