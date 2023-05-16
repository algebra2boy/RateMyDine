import { body } from 'express-validator';

const ValidateFoodReviewSchema = [
    // tests for a food review before storing in a database
    body("FoodQuality", "FoodQuality is not valid integer from 1 to 5",).notEmpty().isLength({ min: 1, max:1 }),
    body("CustomerService", "CustomerService is not valid integer from 1 to 5",).notEmpty().isLength({ min: 1, max:1 }),
    body("Atmosphere", "Atmosphere is not valid integer from 1 to 5",).notEmpty().isLength({ min: 1, max:1 }),
    body("Healthiness", "Healthiness is not valid integer from 1 to 5",).notEmpty().isLength({ min: 1, max:1 }),
    body("SeatAvailability", "SeatAvailability is not valid integer from 1 to 5",).notEmpty().isLength({ min: 1, max:1 }),
    body("Taste", "Taste is not valid integer from 1 to 5",).notEmpty().isLength({ min: 1, max:1 })
]

export { ValidateFoodReviewSchema } ;