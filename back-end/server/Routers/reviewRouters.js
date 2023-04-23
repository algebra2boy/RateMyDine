import express from "express";
import * as dbUtils from "../reviewDBUtils.js";
import { diningInfo } from "../../MockData/diningHallInfo.js";

const reviewRouter = express.Router();

reviewRouter.get("/diningInfo", async (req, res) => {
    res.set('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(diningInfo));
});

/*
We will use fetch API to fetch all the food review from a particular dining hall
- Before this step, checking whether the user is login is important but we can hold off this for now
    - if user is not login, a json message with a status code 401 (unauthenticated)
1. we need to check if diningHall name is valid, hence blocking their calls when it is not valid
2. we need to retrieve food review from this dining hall
    - if successful, then send a json message with a status code 200 (okay)
    - if not, send a json message with warning and a status code 404 (Not found)
*/

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
reviewRouter.post("/review/:diningHall", async (req, res) => {
    let dine = req.body;
    let hall = req.params.diningHall;
    let doc = dbUtils.getDoc(hall);
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

reviewRouter.get("/info/:diningHall", (req, res) => {
    let hall = req.params.diningHall;
    let list = diningInfo.filter((obj) => obj.name.toLowerCase() === hall.toLowerCase());
    if(list.length === 0) res.status(404).send("Not Found");
    else res.send(JSON.stringify(list[0]));
});

export default reviewRouter;