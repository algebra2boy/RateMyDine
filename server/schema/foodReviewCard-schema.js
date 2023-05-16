import { body } from 'express-validator';

const ValidateFoodReviewSchema = [
    // tests for a food review before storing in a database
    body('reviewer_id', "review id is empty").notEmpty(),
    body("FoodQuality", "FoodQuality is empty",).notEmpty(),
    body("CustomerService", "CustomerService is empty",).notEmpty(),
    body("Atmosphere", "Atmosphere is empty",).notEmpty(),
    body("Healthiness", "Healthiness is empty",).notEmpty(),
    body("SeatAvailability", "SeatAvailability is empty",).notEmpty(),
    body("Taste", "Taste is empty",).notEmpty()
]

export { ValidateFoodReviewSchema } ;