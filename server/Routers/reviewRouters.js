import express from "express";
import * as dbUtils from "../DataBase/reviewDBUtils.js"; // helper for database CRUD
import { diningInfo } from "../MockData/diningHallInfo.js"; // every dining hall review data
import server from "../server.js";

const reviewRouter = express.Router();

// retrieve dining hall info such as name and count of reviews
reviewRouter.get("/diningInfo", async (req, res) => {
    const diningInfo = await server.diningInfo.find({}).toArray();
    res.send(diningInfo);
});


reviewRouter.get("/:diningHall", (req, res) => {
    res.sendFile("./client/HTML/dining.html", { root: "./" });
});

reviewRouter.get("/info/:diningHall", (req, res) => {
    // grabs the dining hall name from the URL
    let hall = req.params.diningHall;
    let list = diningInfo.filter((obj) => obj.name.toLowerCase() === hall.toLowerCase()); //filters through the object imported from diningHallInfo.js
    
    if (list.length === 0) res.status(404).send("Not Found"); //if length is 0 return 404 not Found as Dining Hall information doesn't exist
    else res.send(JSON.stringify(list[0])); // else return the first element -> should be the only 1 in the array, which is the info for the dining hall.

});

// get all the food review from a particular dining hall
reviewRouter.get("/review/:dininghall", async (req, res) => {
    // grabs the parameter from the URL
    let diningHallName = req.params.dininghall; 

    let document = await dbUtils.getReview(diningHallName); //Calls a helper function imported from reviewDBUtils.js
    res.send(document); //Sends all the reviews for the requesting dining hall to the front end for rendering.
});

// create a new food review for a particular dining hall
reviewRouter.post("/review/:diningHall", async (req, res) => {
    let diningHallReview = req.body.review; //grabs the body from the post requests
    let diningHallName = req.params.diningHall;

    let result = await dbUtils.createReview(diningHallName, diningHallReview);
    res.send(result);
});

// update an existing food review for a particular dining hall
reviewRouter.post("/review/:dininghall/:reviewID", async (req, res) => {
    // grabs parameters and calls corresponding helper function
    let foodReview = req.body.review;
    let diningHallName = req.params.dininghall; 
    let foodReviewID = req.params.reviewID;

    let result = await dbUtils.updateReview(diningHallName, foodReview, foodReviewID);
    res.send(result);
});

// // fill the database with the Mockdata for testing and rendering purposes
// reviewRouter.post("/allReviews", async (req, res) => { 
//     let msg = await dbUtils.init();
//     res.send(msg);
// });

// delete an existing food review for a particular dining hall
reviewRouter.delete("/review/:dininghall/:reviewID", async (req, res) => {

    let diningHallName = req.params.dininghall;
    let foodReviewID = req.params.reviewID;

    let result = await dbUtils.deleteReview(diningHallName, foodReviewID);
    res.send(result);
});

export default reviewRouter;