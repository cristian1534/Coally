import { Router } from 'express';
import { MongoRepository } from '../repository/mongo';
import { TaskUseCase } from '../../../task/application/taskUseCase';
import { TaskController } from '../controllers/task.ctrl';
import { createTaskSchema, handleValidationErrors } from '../utils/validation.schemas';
import { validateToken } from '../../../user/utils/token.validator';

const router = Router();
const taskRepository = new MongoRepository();
const taskUseCase = new TaskUseCase(taskRepository);
const taskController = new TaskController(taskUseCase);

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       description: Provide your JWT token
 *
 *   schemas:
 *     TASK:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Task's title
 *         description:
 *           type: string
 *           description: Task's description
 *         status:
 *           type: boolean
 *           description: Task's status
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Task's creation date
 *       example:
 *         title: "Coding a new project"
 *         description: "Coding a new project with Node.js"
 *         status: true
 *         createdAt: "2021-09-01T00:00:00.000Z"
 *
 * /tasks:
 *   post:
 *     summary: Create a new TASK
 *     security:
 *       - bearerAuth: []  
 *     tags: [TASK]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TASK'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TASK'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Error creating the TASK
 */
router.post('/', validateToken, createTaskSchema, handleValidationErrors,  taskController.create);
/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     security:
 *       - bearerAuth: [] 
 *     tags: [TASK]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TASK'  # Esquema de TASK para cada tarea en la lista
 *       500:
 *         description: Error retrieving tasks
 */
router.get('/', validateToken, taskController.get);
/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get a task by ID
 *     security:
 *       - bearerAuth: []  
 *     tags: [TASK]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the task to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TASK'  
 *       404:
 *         description: Task not found
 *       500:
 *         description: Error retrieving the task
 */
router.get('/:id', validateToken, taskController.getById);
/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update a task by ID
 *     security:
 *       - bearerAuth: []  
 *     tags: [TASK]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the task to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TASK'  
 *     responses:
 *       200:
 *         description: Task successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TASK'  
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Task not found
 *       500:
 *         description: Error updating the task
 */
router.put('/:id', validateToken, taskController.update);
/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     security:
 *       - bearerAuth: []  
 *     tags: [TASK]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the task to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task successfully deleted
 *       404:
 *         description: Task not found
 *       500:
 *         description: Error deleting the task
 */
router.delete('/:id',validateToken, taskController.delete);

export default router;
