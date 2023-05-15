import { body } from 'express-validator';

const ValidateSignupSchema = [
    body('firstName', "first name must contain letters").isAlpha(),
    body('firstName', "first name is empty").notEmpty(),
    body('lastName', "last name must contain letters").isAlpha(),
    body('lastName', "last name is empty").notEmpty(),
    body('userName', "user name is empty").notEmpty(),
    body('userName', "Please enter a user name at least 5 and less than 20 characters").isLength({ min: 5, max: 20}),
    body('email', "Email is not valid").isEmail(),
    body("password", "Please enter a password at least 8 characters",).isLength({ min: 8 })
]

export { ValidateSignupSchema };