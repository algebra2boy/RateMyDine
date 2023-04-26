import express from "express";
import * as dbUtils from "../reviewDBUtils.js"; //importing helper functions.
import { diningInfo } from "../../MockData/diningHallInfo.js"; //importing information object

const reviewRouter = express.Router();

reviewRouter.get("/diningInfo", async (req, res) => { //this is the endpoint for testing purposes that dininghall Info that is imported from diningHallInfo.js
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
reviewRouter.get("/review/:dininghall", async (req, res) => {
    let dine = req.params.dininghall; // grabs the parameter from the URL
    let doc = await dbUtils.getReview(dine); //Calls a helper function imported from reviewDBUtils.js
    res.send(doc); //Sends all the reviews for the requesting dining hall to the front end for rendering.
});
// create a new food review for a particular dining hall
reviewRouter.post("/review/:diningHall", async (req, res) => {
    let rev = req.body.review; //grabs the body from the post requests
    let hall = req.params.diningHall;
    let result = await dbUtils.createReview(hall, rev);
    res.send(result);
});

// update an existing food review for a particular dining hall
reviewRouter.post("/review/:dininghall/:reviewID", async (req, res) => {
    let rev = req.body.review;
    let hall = req.params.dininghall; // grabs parameters and calls corresponding helper function
    let id = req.params.reviewID;
    let result = await dbUtils.updateReview(hall, rev, id);
    res.send(result);
});

// delete an existing food review for a particular dining hall
reviewRouter.delete("/review/:dininghall/:reviewID", async (req, res) => {
    let hall = req.params.diningHall;
    let id = req.params.reviewID; 
    let result = await dbUtils.deleteReview(hall, id); 
    res.send(result);
});

reviewRouter.get("/:diningHall", (req, res) => {
    res.sendFile("./front-end/HTML/dining.html", {root: "./"});
});

reviewRouter.get("/info/:diningHall", (req, res) => {
    let hall = req.params.diningHall;       // grabs the dining hall name from the URL
    let list = diningInfo.filter((obj) => obj.name.toLowerCase() === hall.toLowerCase()); //filters through the object imported from diningHallInfo.js
    if(list.length === 0) res.status(404).send("Not Found"); //if length is 0 return 404 not Found as Dining Hall information doesn't exist
    else res.send(JSON.stringify(list[0])); // else return the first element -> should be the only 1 in the array, which is the info for the dining hall.
});

reviewRouter.post("/allReviews", async (req, res) => { // This is an endpoint to fill the database with the Mockdata for testing and rendering purposes
    let msg = await dbUtils.init();
    res.send(msg);
});

export default reviewRouter;