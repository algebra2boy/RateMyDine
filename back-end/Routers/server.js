const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

// main page
app.get('/', (req, res) => {
    console.log("HELLO");
    res.sendFile(path.join(__dirname, "../../","index.html"));
})

app.listen(port, () => {
    console.log(`server started at ${port}`);
});