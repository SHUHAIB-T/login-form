const express = require("express");
const path = require("path");
const hbs = require("express-handlebars");
const session = require("express-session");
const nocache = require("nocache");

const loginRouter = require("./routes/login");

// const hbs = require('hbs')
const app = express();
app.use(nocache());
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.engine(
  "hbs",
  hbs.engine({
    layoutsDir: __dirname + "/views",
    extname: "hbs",
    defaultLayout: "layout",
  })
);

app.use(
  session({
    secret: "session key",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 6000000 },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", loginRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.send("error occured!!");
});

app.listen(3000, () => console.log("Server is running...."));
