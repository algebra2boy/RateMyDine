import authRouter from "./Routers/authRouters.js";
import reviewRouter from "./Routers/reviewRouters.js";
import express from "express";
import logger from "morgan";
import PouchDB from "pouchdb";
const app = express();
const port = 3000;

// TODO: implement pounchDB and initialize the DB here
let userDB = new PouchDB("users");
let reviewDB = new PouchDB("reviews");

// a built-in middleware function in Express that serves static files and is based on serve-static.
// must use this to load the css and pictures to the all the pages
app.use(express.static("."));

// Support JSON on requests and HTML form
app.use(express.json());

// Use the logger middleware to easily log every HTTP request to our server
app.use(logger("dev"));

// decode the the request body send through html form
// documentation: https://stackoverflow.com/questions/25471856/express-throws-error-as-body-parser-deprecated-undefined-extended
app.use(express.urlencoded({ extended: true }));

// where we activate the routers
app.use(authRouter);
app.use(reviewRouter);


app.listen(port, () => {
    console.log(`server started at ${port}`);
});

export { userDB, reviewDB };