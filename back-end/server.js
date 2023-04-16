import Routers from "./Routers/routers.js";
import express from "express";
import logger from "morgan";
const app = express();
const port = 3000;

// a built-in middleware function in Express that serves static files and is based on serve-static.
// must use this to load the css and pictures to the main page
app.use(express.static("."));

// Support JSON on requests
app.use(express.json());

// Use the logger middleware to easily log every HTTP request to our server
app.use(logger("dev"));

app.use(Routers);


app.listen(port, () => {
    console.log(`server started at ${port}`);
});