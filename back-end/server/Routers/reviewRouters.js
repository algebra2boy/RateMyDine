import express from "express";


const reviewRouter = express.Router();

// get all the food review from a particular dining hall
reviewRouter.get("/review/:dininghall", (req, res) => {
    res.json({"mes": "HELLO"})
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