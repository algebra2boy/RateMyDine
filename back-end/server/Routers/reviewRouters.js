import express from "express";
import { readFile } from 'fs/promises';
import * as dbUtils from "../reviewDBUtils.js";

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
    let dine = req.params.dininghall;
    dbUtils.getDoc(dine).then((doc) =>{
        res.send(doc);
    })
})
reviewRouter.get("/review/:userID", (req,res) => {
    
});
// create a new food review for a particular dining hall
reviewRouter.post("/review", (req, res) => {
    let dine = req.body;
    dbUtils.createDoc(dine).then((val) =>{
        res.send(val);
    })
})

// update an existing food review for a particular dining hall
reviewRouter.post("/review/:dininghall/:reviewID", (req, res) => {

})

// delete an existing food review for a particular dining hall
reviewRouter.delete("/review/:dininghall/:reviewID", (req, res) => {
    
})

reviewRouter.get("/:diningHall", (req, res) => {
    res.sendFile("./front-end/HTML/dining.html", {root: "./"});
});
export default reviewRouter;