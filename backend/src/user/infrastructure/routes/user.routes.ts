import { Router } from "express";
import { MongoRepository } from "../repository/mongo";
import { UserController } from "../controllers/user.ctrl";
import { UserUseCase } from "../../application/userUseCase";
import {
  createUserSchema,
  handleValidationErrors,
} from "../../../task/infrastructure/utils/validation.schemas";

const router = Router();

const userRepository = new MongoRepository();
const userUseCase = new UserUseCase(userRepository);
const userController = new UserController(userUseCase);

/**
 * @swagger
 * components:
 *   securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        required:
 *          - JWT Token
 *
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: USER's email
 *         password: 
 *           type: string
 *           description: USER's password
 *       example:
 *         email: "christian@gmail.com"
 *         password: "admin123"
 * 
 * 
 *     Register:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: USER's email.
 *         password:
 *           type: string
 *           description: USER's password.
 *       example:
 *         email: "cristian@gmail.com"
 *         password: "admin123"
 *
 */

/**
 * @swagger
 * tags:
 *   name: USER
 *   description: REST API NodeJS-TS Hexagonal Structure.
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new USER
 *     tags: [USER]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Register'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Register'
 *       500:
 *         description: Error adding new USER
 */

router.post(
  "/",
  createUserSchema,
  handleValidationErrors,
  userController.create
);
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all USERS
 *     tags: [USER]
 *     responses:
 *       200:
 *         description: Success
 *
 *       404:
 *          description: Not Found
 *
 *       500:
 *         description: Error when fetching USERS
 */
router.get("/", userController.get);
export default router;
