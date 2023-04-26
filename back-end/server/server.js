import authRouter from "./Routers/authRouters.js";
import reviewRouter from "./Routers/reviewRouters.js";
import express from "express";
import logger from "morgan";
import PouchDB from "pouchdb";
const app = express();
const port = 3000;

// implement pounchDB and initialize the DB here
let userDB = new PouchDB("users");
let reviewDB = new PouchDB("reviews");

//for testing purposes
app.delete("/db", async (req, res)=>{
    await reviewDB.destroy()
    reviewDB = new PouchDB("reviews");
    res.send("Success");
})

// a built-in middleware function in Express that serves static files and is based on serve-static.
// must use this to load the css and pictures to the all the pages
app.use(express.static("."));

// Support JSON on requests and HTML form
app.use(express.json());

// Use the logger middleware to easily log every HTTP request to our server
app.use(logger("dev"));

// decode the the request body send through html form
app.use(express.urlencoded({ extended: true }));

// where we activate the routers
app.use(authRouter);
app.use(reviewRouter);


app.listen(port, () => {
    console.log(`server started at ${port}`);
});

export { userDB, reviewDB };