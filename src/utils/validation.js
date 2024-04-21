import { body } from "express-validator";

export const addTaskValidation = [
    body("name", "Task name is required").not().isEmpty(),
];

export const addTagValidation = [
    body("name", "Tag name is required").not().isEmpty(),
];

export const addCheckListItemValidation = [
    body("name", "Item name is required").not().isEmpty(),
];

export const testValidations = [
    body("name", "Task name is required").not().isEmpty(),
    body("email", "Email is required").not().isEmpty(),
    body("email", "Invalid email").isEmail(),
];
