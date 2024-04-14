import taskRouter from './task.routes.js';
import express from 'express';
const router = express.Router();

router.use('/tasks', taskRouter);

export default router;