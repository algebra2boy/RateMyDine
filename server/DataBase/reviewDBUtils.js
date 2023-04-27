import { reviewDB } from "../server.js";
import { diningReview } from "../MockData/reviews.js";
import { Review } from "../MockData/classDefinitions.js";

const keyMap = {
    ReviewDescription: "description",
    FoodQuality: "foodQuality",
    CustomerService: "customerService",
    Atmosphere: "atmosphere",
    Healthiness : "healthiness",
    SeatAvailability: "seatAvailability",
    Taste: "taste",
}
function computeOverall(review){ //function that helps compute the overall stars that is the average of other six fields
    let sum = 100 * ((Number(review["FoodQuality"])/5) + (Number(review["CustomerService"])/5)
                    + (Number(review["Atmosphere"])/5) + (Number(review["Healthiness"])/5) 
                    + (Number(review["SeatAvailability"])/5) + (Number(review["Taste"])/5));
    let average = Math.ceil(Math.ceil(sum / 6)  * 0.01 * 5);  //rounding up for the rendering of overall stars.
    return average;
}
async function createReview(hall, revi){ //addes new review to the dining hall document.
    try{
        let doc = await reviewDB.get(hall); // gets the document with id matching the dining hall.
        let review = JSON.parse(revi); // parses the document so the reviews can be accessed and updated with insertion of new review.
        let average = computeOverall(review); // computes the average
        let nRev = new Review(""+(Number(doc.reviews[0].id)+1), "April 22, 2023", "ABCDED", average, review.ReviewDescription, 
        review.FoodQuality,review.Atmosphere, review.Healthiness, review.SeatAvailability, review.Taste);
        doc.reviews.unshift(nRev); // addes the new review object to the front of the reviews array.
        let res = await reviewDB.put(doc); //puts the updated dining hall doc into the database
        return JSON.stringify(res);
    }
    catch (e){
        console.error(e);
    }
}
async function getReview(info){ //gets all the reviews for a dining hall and returns it to the front-end.
    try{
        let res = await reviewDB.get(info) // gets the document from the db
        return JSON.stringify(res); // return the stringified version of the document.
    }
    catch (e){  //catches the error.
        console.error(e);
    }
}
async function updateReview(hall, revi, id){
    try{
        let doc = await reviewDB.get(hall); // gets the document of the dining hall.
        for(let i = 0; i < doc["reviews"].length; i++){ // loops through the reviews of the dining hall and tries to find the matching post id.
            if(doc.reviews[i].id === id){ // if the id matches the query
                let review = JSON.parse(revi); //parse the body passed in by the POST request.
                for(let key in keyMap){
                    let mapKey = keyMap[key]; // going through the keys in the keyMap that maps the POST request properties to the property names stored in the database.
                    doc.reviews[i][mapKey] = review[key] === undefined ? doc.reviews[i][mapKey] : review[key]; // updates the review in the document if the property exists in the body passed from the POST request. Keeps it the same if undefined.
                }
                doc.reviews[i].overall = computeOverall(review); //recomputes overall with updated information
                let res = await reviewDB.put(doc); // PUTS the document back into the db as update.
                return true;
            }
        }
        return false;
    }
    catch (e) { //catching errors
        console.error(e);
    }
}
async function deleteReview(hall,id){
    let doc = await reviewDB.get(hall); //gets the dining hall requested in the body of the delete request
    let found = false; // flag for loop
    let i = undefined; // place holder
    for(i = 0; i < doc.Reviews.length; i++){ // looping through the reviews of the dining hall for to find the corresponding id of the message to be deleted.
        if(doc.Reviews[i].id === id){
            found = true; //when found, set flag - break
            break;
        }
    }
    if(found){ // if flag is set
        doc.Reviews.splice(i, 1); // remove the review from the reviews array.
        reviewDB.put(doc);  // PUT the updated document back into the database
    }
    return found;
}

async function init(){ // Since everyone is running Pouch on locally, seting up an init for db initialization.
    try{
        for(let i = 0; i < diningReview.length; i++){   // looping through each object in the object of diningReview that is imported.
            await reviewDB.put({            // PUT a document with the id of the dining hall and a reviews array from the diningReview object
                _id: diningReview[i].DiningName,
                reviews: diningReview[i].Reviews,
            })
        }
        return("Successful Initialization");
    }
    catch (e){  // catch errors
        console.error(e);
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