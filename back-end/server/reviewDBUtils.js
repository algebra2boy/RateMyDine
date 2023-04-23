import { reviewDB } from "./server.js";
import { diningReview } from "../MockData/reviews.js";
import { diningInfo } from "../MockData/diningHallInfo.js";
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
function computeOverall(review){
    let sum = 100 * ((Number(review["FoodQuality"])/5) + (Number(review["CustomerService"])/5)
                    + (Number(review["Atmosphere"])/5) + (Number(review["Healthiness"])/5) 
                    + (Number(review["SeatAvailability"])/5) + (Number(review["Taste"])/5));
    let average = Math.ceil(Math.ceil(sum / 6)  * 0.01 * 5); 
    return average;
}
async function createReview(hall, revi){
    try{
        let doc = await reviewDB.get(hall);
        let review = JSON.parse(revi);
        let average = computeOverall(review);
        let nRev = new Review(""+(Number(doc.reviews[0].id)+1), "April 22, 2023", "ABCDED", average, review.ReviewDescription, 
        review.FoodQuality,review.Atmosphere, review.Healthiness, review.SeatAvailability, review.Taste);
        doc.reviews.unshift(nRev);
        let res = await reviewDB.put(doc);
        return JSON.stringify(res);
    }
    catch (e){
        console.error(e);
    }
}
async function getReview(info){
    try{
        // console.log(info);
        let res = await reviewDB.get(info)
        // console.log(JSON.stringify(res));
        // console.log(res);
        return JSON.stringify(res);
    }
    catch (e){
        console.error(e);
    }
}
async function updateReview(hall, revi, id){
    try{
        let doc = await reviewDB.get(hall);
        for(let i = 0; i < doc["reviews"].length; i++){
            if(doc.reviews[i].id === id){
                let review = JSON.parse(revi);
                console.log(review);
                for(let key in keyMap){
                    // console.log(review[key]);
                    let mapKey = keyMap[key];
                    // console.log(mapKey);
                    doc.reviews[i][mapKey] = review[key] === undefined ? doc.reviews[i][mapKey] : review[key];
                }
                doc.reviews[i].overall = computeOverall(review);
                let res = await reviewDB.put(doc);
                // console.log(res);
                return true;
            }
        }
        return false;
    }
    catch (e) {
        console.error(e);
    }
}
async function deleteReview(hall,id){
    let doc = await reviewDB.get(hall);
    let found = false;
    let i = undefined;
    for(i = 0; i < doc.Reviews.length; i++){
        if(doc.Reviews[i].id === id){
            found = true;
            break;
        }
    }
    if(found){
        doc.Reviews.splice(i, 1);
        reviewDB.put(doc);
    }
    return found;
}

async function init(){
    try{
        for(let i = 0; i < diningReview.length; i++){
            await reviewDB.put({
                _id: diningReview[i].DiningName,
                reviews: diningReview[i].Reviews,
            })
        }
        return("Successful Initialization");
    }
    catch (e){
        console.error(e);
    }
}


export {
    createReview,
    getReview,
    updateReview,
    deleteReview,
    init
}