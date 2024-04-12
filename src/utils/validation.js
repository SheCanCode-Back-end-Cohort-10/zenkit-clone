import { body } from "express-validator";

export const addTaskValidation = [
    body("name", "Task name is required").not().isEmpty(),
];
