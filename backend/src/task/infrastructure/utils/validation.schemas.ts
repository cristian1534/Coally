import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

export const createTaskSchema = [
  body("title")
    .isString()
    .isLength({ min: 1, max: 255 })
    .notEmpty()
    .withMessage("Title is required"),
  body("description")
    .isString()
    .isLength({ min: 1, max: 255 })
    .notEmpty()
    .withMessage("Description is required"),
];

export const createUserSchema = [
  body("email").isEmail().normalizeEmail().withMessage("Invalid email"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];

export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }
  next();
};
