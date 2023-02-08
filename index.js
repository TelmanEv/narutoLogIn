/*
    Importing necessary modules
*/ 
const express = require("express");
const app = express();
const path = require("path");
const logger = require("morgan");
const methodOverride = require('method-override');
// connection to our database
const connectToMongoDB = require("./database/mongodb");

require("dotenv").config();
const cookieParser = require("cookie-parser")
const sessions = require("express-session");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
// Logging every request in the terminal
app.use(logger("dev"));
// Read incoming requests properly
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// We can use HTML methods with back-end methods smoothly
app.use(methodOverride('_method'));


app.use(cookieParser(process.env.COOKIE_SECRET));


const oneDay = 1000 * 60 * 60 * 24

app.use(sessions({
    secret: process.env.COOKIE_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: oneDay }
}));


// Back-end
const userRouter = require("./routes/api/userRouter");
app.use("/api/user", userRouter);


// Front-end
const viewsRouter = require("./routes/viewRouters/viewRouter");
app.use("/", viewsRouter);


/*
    Turning the server on
*/
const PORT = 4400;

app.listen(PORT, () => {
    console.log(`server is on ${PORT}`);

    connectToMongoDB()
});