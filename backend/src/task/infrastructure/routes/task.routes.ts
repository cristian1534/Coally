import { Router } from 'express';
import { MongoRepository } from '../repository/mongo';
import { TaskUseCase } from '../../../task/application/taskUseCase';
import { TaskController } from '../controllers/task.ctrl';


const router = Router();
const taskRepository = new MongoRepository();
const taskUseCase = new TaskUseCase(taskRepository);
const taskController = new TaskController(taskUseCase);

router.post('/', taskController.create);
router.get('/', taskController.get);
router.put('/:id', taskController.update);
router.get('/:id', taskController.getById);
router.delete('/:id', taskController.delete);

export default router;