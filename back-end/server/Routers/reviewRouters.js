import express from "express";
import { readFile } from 'fs/promises';

const reviewRouter = express.Router();

reviewRouter.get("/diningInfo", async (req, res) => {
    const pathname = "back-end/MockData/diningHallInfo.json";
    try {
        const data = await readFile(pathname, 'utf8');
        res.set('Content-Type', 'application/json');
        res.status(200).send(data);
    } catch (error) {
        res.status(404).send();
    }
});

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