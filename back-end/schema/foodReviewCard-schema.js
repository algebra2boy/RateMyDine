import { body } from 'express-validator';

const ValidateFoodReviewSchema = [
    // tests for a food review before storing in a database
    body('DiningName', "Dining Name is empty").isEmpty(),
    body('ReviewPostTime', "Review post tiem is empty").isEmpty(),
    body('UserId', "user id is empty").isEmpty(),
    body('ReviewStars', "review stars is empty").isEmpty(),
    body("ReviewDescription", "review description is empty",).isEmpty(),
    body('ReviewDescription').isLength({ min: 30 }).withMessage('ReviewDescription must be at least 30 characters long'),
    body('ReviewDescription').isLength({ max: 400 }).withMessage('ReviewDescription must be at most 400 characters long'),
    body("FoodQuality", "FoodQuality is not a number",).isNumeric()(),
    body("CustomerService", "CustomerService is not a number",).isNumeric(),
    body("Atmosphere", "Atmosphere is not a number",).isNumeric(),
    body("Healthiness", "Healthiness is not a number",).isNumeric(),
    body("SeatAvailability", "SeatAvailability is not a number",).isNumeric(),
    body("Taste", "Taste is not a number",).isNumeric()
]

export { ValidateFoodReviewSchema } ;