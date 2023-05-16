import { Review } from "../MockData/classDefinitions.js";
import server from "../server.js";

/**
 * Compute the overall stars that is the average of other six fields.
 * @param  {Review object} foodReview - the review from a user when one submits a form on the pop up window
 * @return {float} average of the review
 */
function computeOverall(foodReview) {
    const { FoodQuality, CustomerService, Atmosphere, Healthiness, SeatAvailability, Taste } = foodReview;
    const sum = 100 * ((Number(FoodQuality) + Number(CustomerService) + Number(Atmosphere) + Number(Healthiness) + Number(SeatAvailability) + Number(Taste)) / 5);
    return Math.ceil(Math.ceil(sum / 6) * 0.01 * 5);  //rounding up for the rendering of overall stars.
}

/**
 * Adds new review to the dining hall document in the database.
 * @param {string} diningHall - the name of the dining hall that we want to insert a document into
 * @param {Review object} foodReview - the food review we wish to add to the dining hall  
 */
async function createReview(diningHall, review) {
    try {
        let document = await server.reviews.findOne( { "DiningHall": diningHall } ); // gets the document with id matching the dining hall.
        let overall  = computeOverall(review); // computes the average
        
        //implement check for login here?

        const { FoodQuality, CustomerService, Atmosphere, Healthiness, SeatAvailability, Taste, ReviewDescription } = review;
        let newFoodReview = {
            review_id: document.Reviews[0] !== undefined ? document.Reviews[0]["review_id"] + 1 : 1,
            review_date: new Date(Date.now()).toISOString(),
            reviewer_name: "ABCDED"   , description     : ReviewDescription,   overall   : overall   ,
            FoodQuality  : FoodQuality, CustomerService : CustomerService  ,   Atmosphere: Atmosphere,
            Healthiness  : Healthiness, SeatAvailability: SeatAvailability ,   Taste     : Taste
        };
        document.Reviews.unshift(newFoodReview); // adds the new review object to the front of the reviews array.

        // puts the updated dining hall doc in the review collection
        const filter = { "DiningHall" : diningHall }; 
        const options = { upsert: true };
        const updateDoc = {
            $set: {
                Reviews: document.Reviews
            }
        };
        await server.reviews.updateOne(filter, updateDoc, options);
        // update the number of reviews in the diningInfo
        const infoDoc = await server.diningInfo.findOne( { "name": diningHall });
        await server.diningInfo.updateOne(
            { "name": diningHall }, 
            {
                $set: { numReviews : infoDoc.numReviews + 1 }
            });
        const updatedInfoDoc = await server.reviews.findOne( { "DiningHall" : diningHall } );
        return JSON.stringify(updatedInfoDoc);
    } catch (error) {
        console.error(error);
    }
}

/**
 * Gets all the reviews for a particular dining hall and returns it to the front-end.
 * @param  {string} diningHall - reviews from all the diningHall
 * @return {Review[]} response - stringify version of the of the list of reviews.
 */
async function getReview(diningHall) {
    try {
        let result = await server.reviews.findOne( { "DiningHall": diningHall } ); // gets the document from the db
        let response = []
        for(let comment of result.Reviews){
            const { review_id, review_date, reviewer_id, overall, description, FoodQuality, CustomerService, Atmosphere, Healthiness, SeatAvailability, Taste } = comment;
            let s = new Review(review_id, new Date(review_date).toDateString(), reviewer_id, overall, description, FoodQuality, CustomerService, Atmosphere, Healthiness, SeatAvailability, Taste);
            response.push(s);
        }
        return JSON.stringify(response); 
    } catch (error) {
        console.error(error);
    }
}

/**
 * update an existing food review for a dining hall and returns it to the front-end.
 * @param  {string} diningHall        - the name of the diningName, ex "Worcester"
 * @param  {Review Object} foodReview - the review of the food 
 * @param  {string} foodReviewID      - the food review ID
 * @return {boolean}                  = whether the foodReviewID exists in db
 */

async function updateReview(diningHall, foodReview, foodReviewID) {
    try {

        let document = await server.reviews.findOne( { "DiningHall" : diningHall } ); // gets the document of the dining hall.

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
 * @param  {string} diningHallName -  the name of the diningName, ex "worcester"
 * @param  {string} foodReviewID   -  the food review ID
 * @return {boolean}found          -  whether we found a review with the matching food review ID
 */
async function deleteReview(diningHall, foodReviewID) {

    let document = await server.reviews.findOne( { "DiningHall": diningHall } ); // gets the dining hall requested in the body of the delete request
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
// exporting the function for use in other js files
export {
    createReview,
    getReview,
    updateReview,
    deleteReview,
}