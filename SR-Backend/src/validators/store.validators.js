import { body } from "express-validator";

export const storeValidationRules = [
  body("name")
    .isString()
    .isLength({ min: 20, max: 60 })
    .withMessage("Name must be between 20 and 60 characters."),

  body("email").isEmail().withMessage("Email must be valid."),

  body("address")
    .isString()
    .isLength({ max: 400 })
    .withMessage("Address must be 400 characters or less."),
];
