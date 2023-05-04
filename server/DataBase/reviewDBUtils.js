// import { reviewDB } from "../server.js";
import { diningReview } from "../MockData/reviews.js";
import { Review } from "../MockData/classDefinitions.js";

const keyMap = {
    ReviewDescription: "description",
    FoodQuality: "foodQuality",
    CustomerService: "customerService",
    Atmosphere: "atmosphere",
    Healthiness: "healthiness",
    SeatAvailability: "seatAvailability",
    Taste: "taste",
}
/**
 * compute the overall stars that is the average of other six fields
 * @param  {Review} review
 * @return {float} average  
 */
function computeOverall(foodReview) {
    const { FoodQuality, CustomerService, Atmosphere, Healthiness, SeatAvailability, Taste } = foodReview;
    const sum = 100 * ((Number(FoodQuality) + Number(CustomerService) + Number(Atmosphere) + Number(Healthiness) + Number(SeatAvailability) + Number(Taste)) / 5);
    let average = Math.ceil(Math.ceil(sum / 6) * 0.01 * 5);  //rounding up for the rendering of overall stars.
    return average;
}

/**
 *  adds new review to the dining hall document.
 * @param  {diningHallName} the name of the dining hall that we want to insert a document into
 * @param {foodReview} the food review we wish to add to the dining hall  
 */
async function createReview(diningHallName, foodReview) {
    try {

        let document = await reviewDB.get(diningHallName); // gets the document with id matching the dining hall.
        let review = JSON.parse(foodReview); // parses the document so the reviews can be accessed and updated with insertion of new review.
        let average = computeOverall(review); // computes the average

        let newFoodReview = new Review("" + (Number(document.reviews[0].id) + 1), "April 22, 2023", "ABCDED", average, review.ReviewDescription,
            review.FoodQuality, review.Atmosphere, review.Healthiness, review.SeatAvailability, review.Taste);
        document.reviews.unshift(newFoodReview); // addes the new review object to the front of the reviews array.

        let response = await reviewDB.put(document); //puts the updated dining hall doc into the database
        return JSON.stringify(response);
    }
    catch (error) {
        console.error(error);
    }
}

/**
 *  gets all the reviews for a dining hall and returns it to the front-end.
 * @param  {diningHallInfo} reviews from all the diningHall
 */
async function getReview(diningHallInfo) {
    try {
        let response = await reviewDB.get(diningHallInfo) // gets the document from the db
        return JSON.stringify(response); // return the stringified version of the document.
    }
    catch (error) {
        console.error(error);
    }
}

/**
 *  update an existing food review for a dining hall and returns it to the front-end.
 * @param  {diningHallName} the name of the diningName, ex "worcester"
 * @param  {foodReview} the review of the food 
 * @param  {foodReviewID} the food review ID
 */

async function updateReview(diningHallName, foodReview, foodReviewID) {
    try {

        let document = await reviewDB.get(diningHallName); // gets the document of the dining hall.

        // loops through the reviews of the dining hall and tries to find the matching post id.
        for (let i = 0; i < document["reviews"].length; i++) {
            if (document.reviews[i].id === foodReviewID) { // if the id matches the query
                let review = JSON.parse(foodReview); //parse the body passed in by the POST request.
                for (let key in keyMap) {
                    let mapKey = keyMap[key]; // going through the keys in the keyMap that maps the POST request properties to the property names stored in the database.
                    document.reviews[i][mapKey] = review[key] === undefined ? document.reviews[i][mapKey] : review[key]; // updates the review in the document if the property exists in the body passed from the POST request. Keeps it the same if undefined.
                }
                document.reviews[i].overall = computeOverall(review); //recomputes overall with updated information
                let response = await reviewDB.put(document); // PUTS the document back into the db as update.
                return true;
            }
        }
        return false;
    }
    catch (error) {
        console.error(error);
    }
}

/**
 *  delete an existing food review for a dining hall and returns it to the front-end.
 * @param  {diningHallName} the name of the diningName, ex "worcester"
 * @param  {foodReviewID} the food review ID
 */
async function deleteReview(diningHallName, foodReviewID) {

    let document = await reviewDB.get(diningHallName); //gets the dining hall requested in the body of the delete request
    let found = false; // flag for loop
    let i = undefined; // place holder

    for (i = 0; i < document.Reviews.length; i++) { // looping through the reviews of the dining hall for to find the corresponding id of the message to be deleted.
        if (document.Reviews[i].id === foodReviewID) {
            found = true; //when found, set flag - break
            break;
        }
    }

    if (found) { // if flag is set
        document.Reviews.splice(i, 1); // remove the review from the reviews array.
        reviewDB.put(document);  // PUT the updated document back into the database
    }

    return found;
}

async function init() { // Since everyone is running Pouch on locally, seting up an init for db initialization.
    try {
        for (let i = 0; i < diningReview.length; i++) {   // looping through each object in the object of diningReview that is imported.
            await reviewDB.put({            // PUT a document with the id of the dining hall and a reviews array from the diningReview object
                _id: diningReview[i].DiningName,
                reviews: diningReview[i].Reviews,
            })
        }
        return ("Successful Initialization");
    }
    catch (error) {
        console.error(error);
    }
}

// exporting the function for use in other js files
export {
    createReview,
    getReview,
    updateReview,
    deleteReview,
    init
}