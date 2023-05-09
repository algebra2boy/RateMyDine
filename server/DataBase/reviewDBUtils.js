// import { reviewDB } from "../server.js";
import { diningReview } from "../MockData/reviews.js";
import { Review } from "../MockData/classDefinitions.js";
import server from "../server.js";

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
 * @param  {diningHall} the name of the dining hall that we want to insert a document into
 * @param {foodReview} the food review we wish to add to the dining hall  
 */
async function createReview(diningHall, foodReview) {
    try {

        let document = await server.reviews.findOne({"DiningHall": diningHall}); // gets the document with id matching the dining hall.
        let review = JSON.parse(foodReview); // parses the document so the reviews can be accessed and updated with insertion of new review.
        let average = computeOverall(review); // computes the average
        let newFoodReview = {
            review_id: document.Reviews[0] !== undefined ? document.Reviews[0]["review_id"] + 1 : 1,
            review_date: new Date(Date.now()).toISOString(),
            reviewer_id: "ABCDED",
            description: review.description,
            overall: average,
            FoodQuality: review.FoodQuality,
            CustomerService: review.CustomerService,
            Atmosphere: review.Atmosphere,
            Healthiness: review.Healthiness,
            SeatAvailability: review.SeatAvailability,
            Taste: review.Taste
        };
        document.Reviews.unshift(newFoodReview); // addes the new review object to the front of the reviews array.
        const filter = {"DiningHall" : diningHall}; //puts the updated dining hall doc into the database
        const options = {upsert: true};
        const updateDoc = {
            $set: {
                Reviews: document.Reviews
            }
        };
        await server.reviews.updateOne(filter, updateDoc, options);
        const infoDoc = await server.diningInfo.findOne({"name": diningHall});
        await server.diningInfo.updateOne({"name": diningHall}, {$set:{numReviews : infoDoc.numReviews + 1}});
        return JSON.stringify(await server.reviews.findOne({"DiningHall" : diningHall}));
    }
    catch (error) {
        console.error(error);
    }
}

/**
 *  gets all the reviews for a dining hall and returns it to the front-end.
 * @param  {diningHall} reviews from all the diningHall
 */
async function getReview(diningHall) {
    try {
        let result = await server.reviews.findOne({"DiningHall": diningHall}); // gets the document from the db
        let response = []
        for(let comment of result.Reviews){
            let s = new Review(comment.review_id, comment.review_date, comment.reviewer_id, comment.overall, comment.description, comment.FoodQuality, 
                            comment.CustomerService, comment.Atmosphere, comment.Healthiness, comment.SeatAvailability,comment.Taste);
            response.push(s);
        }
        return JSON.stringify(response); // return the stringified version of the of the list of reviews.
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

async function updateReview(diningHall, foodReview, foodReviewID) {
    try {

        let document = await server.reviews.findOne({"DiningHall" : diningHall}); // gets the document of the dining hall.

        // loops through the reviews of the dining hall and tries to find the matching post id.
        for (let i = 0; i < document["Reviews"].length; i++) {
            if (document.Reviews[i].review_id === Number(foodReviewID)) { // if the id matches the query
                let review = JSON.parse(foodReview); //parse the body passed in by the POST request.
                for (let key in review) {
                    document.Reviews[i][key] = review[key] === undefined ? document.reviews[i][key] : review[key]; // updates the review in the document if the property exists in the body passed from the POST request. Keeps it the same if undefined.
                }
                document.Reviews[i].overall = computeOverall(document.Reviews[i]); //recomputes overall with updated information
                server.reviews.updateOne({"DiningHall": diningHall}, {$set:{Reviews: document.Reviews}}, {upsert:true}); // PUTS the document back into the db as update.
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
async function deleteReview(diningHall, foodReviewID) {

    let document = await server.reviews.findOne({"DiningHall": diningHall}); //gets the dining hall requested in the body of the delete request
    let found = false; // flag for loop
    let i = undefined; // place holder

    for (i = 0; i < document.Reviews.length; i++) { // looping through the reviews of the dining hall for to find the corresponding id of the message to be deleted.
        if (document.Reviews[i].review_id === Number(foodReviewID)) {
            found = true; //when found, set flag - break
            break;
        }
    }

    if (found) { // if flag is set
        document.Reviews.splice(i, 1); // remove the review from the reviews array.
        await server.reviews.updateOne({"DiningHall":diningHall}, {$set:{Reviews: document.Reviews}}, {upsert:true}); // PUT the updated document back into the database
        await server.diningInfo.updateOne({"name": diningHall}, {$set: {numReviews: document.Reviews.length}}, {upsert:true}) // update the count with the length of reviews array.
    }

    return found;
}

// async function init() { // Since everyone is running Pouch on locally, seting up an init for db initialization.
//     try {
//         for (let i = 0; i < diningReview.length; i++) {   // looping through each object in the object of diningReview that is imported.
//             await reviewDB.put({            // PUT a document with the id of the dining hall and a reviews array from the diningReview object
//                 _id: diningReview[i].DiningName,
//                 reviews: diningReview[i].Reviews,
//             })
//         }
//         return ("Successful Initialization");
//     }
//     catch (error) {
//         console.error(error);
//     }
// }

// exporting the function for use in other js files
export {
    createReview,
    getReview,
    updateReview,
    deleteReview,
    init
}