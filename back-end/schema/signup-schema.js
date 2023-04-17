import { body, check } from 'express-validator';

const ValidateSignupSchema = [
    body('firstName', "first name is empty").notEmpty(),
    body('lastName', "last name is empty").notEmpty(),
    body('userName', "user name is empty").notEmpty(),
    body('email', "Email is not valid").notEmpty().isEmail(),
    body("password", "Please enter a password at least 8 character",).isLength({ min: 8 }),
]

export { ValidateSignupSchema };