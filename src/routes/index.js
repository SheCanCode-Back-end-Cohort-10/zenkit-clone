import taskRouter from './task.routes.js';
import tagRouter from './tag.routes.js';
import express from 'express';
import userRouter from './user.routes.js';
const router = express.Router();

router.use('/tasks', taskRouter);
router.use('/tags', tagRouter);
router.use('/user', userRouter);

export default router;