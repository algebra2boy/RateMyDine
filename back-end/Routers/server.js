const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

// a built-in middleware function in Express that serves static files and is based on serve-static.
// must use this to load the css and pictures to the main page
app.use(express.static("."));

// main page
app.get('/', (req, res) => {
    // index html is found two levels above
    res.sendFile(path.join(__dirname, "../../","index.html"));
})

// sign up
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, "../../front-end/HTML/","signup.html"));
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, "../../front-end/HTML/","login.html"));
})

app.listen(port, () => {
    console.log(`server started at ${port}`);
});