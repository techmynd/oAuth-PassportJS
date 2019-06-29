const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const expressValidator = require("express-validator");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const mongo = require("mongodb");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/loginapp", { useNewUrlParser: true });
const db = mongoose.connection;

const routes = require("./routes/index");
const users = require("./routes/users");

// init app
const app = express();

// view engine
app.set("views", path.join(__dirname, "views"));
app.engine("handlebars", exphbs({ defaultLayout: "layout" }));
app.set("view engine", "handlebars");

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser);

// set static public folder
app.use(express.static(path.join(__dirname, "public")));

// express session
app.use(
  session({
    secret: "test-secret",
    saveUninitialized: true,
    resave: true,
  }),
);

// passport init
app.use(passport.initialize());
app.use(passport.session());

// express validator
// app.use(
//   expressValidator({
//     errorFormatter: function(param, msg, value) {
//       var namespace = param.split("."),
//         root = namespace.shift(),
//         formParam = root;
//       while (namespace.length) {
//         formParam += "[" + namespace.shift() + "]";
//       }
//       return {
//         param: formParam,
//         msg: msg,
//         value: value,
//       };
//     },
//   }),
// );

// connect flash
app.use(flash());

// global vars
app.use(function(res, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

app.use("/", routes);
app.use("/users", users);

// set port
app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), function() {
  console.log("server running at " + app.get("port"));
});
