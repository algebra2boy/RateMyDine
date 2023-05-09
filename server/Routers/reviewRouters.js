import express from "express";
import * as dbUtils from "../DataBase/reviewDBUtils.js"; // helper for database CRUD
import server from "../server.js";

const reviewRouter = express.Router();

// retrieve dining hall info such as name and count of reviews
reviewRouter.get("/diningInfo", async (req, res) => {
    const diningInfo = await server.diningInfo.find({}).toArray();
    res.send(diningInfo);
});

// render the dining hall page
reviewRouter.get("/:diningHall", (req, res) => {
    res.sendFile("./client/HTML/dining.html", { root: "./" });
});

// retrieve dining info 
reviewRouter.get("/info/:diningHall", async (req, res) => {
    // grabs the dining hall name from the URL
    let name = req.params.diningHall;
    const diningInfo = await server.diningInfo.findOne({"name": name});

    // Dining Hall information doesn't exist
    if (diningInfo === null) {
        res.status(404).send({
            "message": `${hall} not found in the database`,
            "status": "failure"
        });
    } else {
        res.send(diningInfo);
    }
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


// delete an existing food review for a particular dining hall
reviewRouter.delete("/review/:dininghall/:reviewID", async (req, res) => {

    let diningHallName = req.params.dininghall;
    let foodReviewID = req.params.reviewID;

    let result = await dbUtils.deleteReview(diningHallName, foodReviewID);
    res.send(result);
});

export default reviewRouter;