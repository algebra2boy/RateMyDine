import Routers from "../server/Routers/routers.js";
import express from "express";
import logger from "morgan";
const app = express();
const port = 3000;

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

app.use(Routers);


app.listen(port, () => {
    console.log(`server started at ${port}`);
});