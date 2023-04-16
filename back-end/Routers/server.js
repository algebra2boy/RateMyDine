const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

// a built-in middleware function in Express that serves static files and is based on serve-static.
// must use this to load the css and pictures to the main page
app.use(express.static("."));

// main page
app.get('/', (req, res) => {
    console.log("HELLO");
    // index html is found two levels above
    res.sendFile(path.join(__dirname, "../../","index.html"));
})

app.listen(port, () => {
    console.log(`server started at ${port}`);
});