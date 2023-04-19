import { body, check } from 'express-validator';

const ValidateSignupSchema = [
    body('firstName', "first name must contain letters").isAlpha(),
    body('lastName', "last name must contain letters").isAlpha(),
    body('userName', "user name is empty").notEmpty(),
    body('SignUpEmail', "Email is not valid").isEmail(),
    body("signUpPassword", "Please enter a password at least 8 character",).isLength({ min: 8 }),
]

const ValidateLoginSchema = [
    body('LoginEmail', "Email is not valid").notEmpty().isEmail(),
    body("LoinInPassword", "Please enter a password at least 8 character",).isLength({ min: 8 }),
]

export { ValidateSignupSchema, ValidateLoginSchema };