import express from "express";

import * as dbUtils from "../DataBase/reviewDBUtils.js"; // helper for database CRUD
import server from "../server.js";
import { Hours, DiningHall, Review } from "../MockData/classDefinitions.js";

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
    let diningName   = req.params.diningHall;
    const diningInfo = await server.diningInfo.findOne({"name": diningName});
    // Dining Hall information doesn't exist
    if (diningInfo === null) {
        res.status(404).send({
            "message": `${diningName} is not found in the database`,
            "status": "failure"
        });
    } else {
        const { name, address, phone, numReview, description, mapURL, hours} = diningInfo;
        const diningObj  = new DiningHall(name, address, phone, numReview, description, mapURL, new Hours(...hours));
        res.send(diningObj);
    }
});

// get all the food review from a particular dining hall
reviewRouter.get("/review/:dininghall", async (req, res) => {
    // grabs query parameters and calls corresponding helper function
    let diningHallName = req.params.dininghall; 

    let document = await dbUtils.getReview(diningHallName); 
    res.send(document); 
});

// create a new food review for a particular dining hall
reviewRouter.post("/review/:diningHall", async (req, res) => {
    let diningHallReview = req.body; //grabs the body from the post requests
    let diningHallName = req.params.diningHall;

//     console.log(diningHallReview)

    let result = await dbUtils.createReview(diningHallName, diningHallReview);
    let rev_Date = new Date(result.review_date)
    let revDate_arr = rev_Date.toDateString().split(" ");
    let leObject = new Review(result.review_id, (revDate_arr[1]+" "+ rev_Date.getDate() + ", " + revDate_arr[3]) ,result.reviewer_id, result.overall, result.description, 
                                result.FoodQuality, result.CustomerService, result.Atmosphere, result.Healthiness, result.SeatAvailability, result.Taste);
    res.send(JSON.stringify(leObject));
});

// update an existing food review for a particular dining hall
reviewRouter.post("/review/:dininghall/:reviewID", async (req, res) => {
    // grabs parameters and calls corresponding helper function
    let foodReview     = req.body.review;
    let diningHallName = req.params.dininghall; 
    let foodReviewID   = req.params.reviewID;

    let result = await dbUtils.updateReview(diningHallName, foodReview, foodReviewID);
    res.send(result);
});


// delete an existing food review for a particular dining hall
reviewRouter.delete("/review/:dininghall/:reviewID", async (req, res) => {

    let diningHallName = req.params.dininghall;
    let foodReviewID   = req.params.reviewID;

    let result = await dbUtils.deleteReview(diningHallName, foodReviewID);
    res.send(result);
});

export default reviewRouter;