import express from 'express';
const taskRouter = express.Router();
import { test, addTask, deleteTask, getTasks, findById, updateTask } from '../controllers/task.controller.js';
import { addTaskValidation } from '../utils/validation.js';
import { setTime } from '../middlewares/time.js';

taskRouter.get('/test', test);
taskRouter.post('/add', setTime, addTaskValidation, addTask);
taskRouter.get('/list', getTasks);
taskRouter.put('/update', updateTask);
taskRouter.get('/findById', findById);
taskRouter.delete('/delete', deleteTask);

export default taskRouter;