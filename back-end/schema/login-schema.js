import { body } from 'express-validator';

const ValidateLoginSchema = [
    body('email', "Email is not valid").notEmpty().isEmail(),
    body("password", "Please enter a password at least 8 character",).isLength({ min: 8 }),
]

export { ValidateLoginSchema };