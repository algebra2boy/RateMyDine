import { body } from 'express-validator';

const ValidateLoginSchema = [
    body('LoginEmail', "Email is not valid").notEmpty().isEmail(),
    body("LoinInPassword", "Please enter a password at least 8 character",).isLength({ min: 8 }),
]

export { ValidateLoginSchema };