import express from "express";


const reviewRouter = express.Router();

/*
We will use fetch API to fetch all the food review from a particular dining hall
- Before this step, checking whether the user is login is important but we can hold off this for now
    - if user is not login, a json message with a status code 401 (unauthenticated)
1. we need to check if diningHall name is valid, hence blocking their calls when it is not valid
2. we need to retrieve food review from this dining hall
    - if successful, then send a json message with a status code 200 (okay)
    - if not, send a json message with warning and a status code 404 (Not found)
*/
reviewRouter.get("/review/:dininghall", (req, res) => {
    
})

// create a new food review for a particular dining hall
reviewRouter.post("/review/:dininghall", (req, res) => {

})

// update an existing food review for a particular dining hall
reviewRouter.post("/review/:dininghall/:reviewID", (req, res) => {

})

// delete an existing food review for a particular dining hall
reviewRouter.delete("/review/:dininghall/:reviewID", (req, res) => {
    
})

export default reviewRouter;