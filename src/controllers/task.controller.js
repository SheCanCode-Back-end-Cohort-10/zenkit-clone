import { NotFoundError, BadRequestError } from '../errors/index.js';
import TaskModel from '../models/task.model.js';
import { validationResult } from 'express-validator';
import asyncWrapper from '../middlewares/async.js';

export const test = asyncWrapper((req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return next(new BadRequestError(errors.array()[0].msg));
    }

    res.status(200).json({
        message: 'Hello World!'
    });
});

export const addTask = asyncWrapper(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(new BadRequestError(errors.array()[0].msg));
    }

    const newTask = await TaskModel.create(req.body);
    return res.status(201).json(newTask);
});

export const getTasks = async (req, res, next) => {
    const tasks = await TaskModel.find({}).populate('tags');
    if (tasks) {
        return res.status(200).json({
            size: tasks.length,
            tasks
        });
    }
}

export const updateTask = async (req, res, next) => {
    const taskId = req.query.id;
    const updates = req.body;

    if (updates.tags) {
        const taskBeforeUpdate = await TaskModel.findById(taskId);
        let tags = [];
        taskBeforeUpdate.tags.forEach(tag => {
            tags.push(tag.toString());
        })
        tags.push(updates.tags[0]);
        updates.tags = tags;
    }

    const updatedTask = await TaskModel.findByIdAndUpdate(taskId, updates, { new: true });
    if (!updatedTask) {
        return next(new NotFoundError(`Task not found`));
    }
    return res.status(200).json(updatedTask);
}

export const findById = asyncWrapper(async (req, res, next) => {
    const taskId = req.query.id;
    const foundTask = await TaskModel.findById(taskId).populate('tags')
    if (!foundTask) {
        return next(new NotFoundError(`Task not found`));
    }
    return res.status(200).json(foundTask);
});

export const findByStatus = asyncWrapper(async (req, res, next) => {
    const taskStatus = req.query.status;

    const foundTasks = await TaskModel.find({ status: taskStatus });
    return res.status(200).json({
        size: foundTasks.length,
        foundTasks
    });
});

export const findByParentId = asyncWrapper(async (req, res, next) => {
    const parentId = req.query.parent;

    const foundTasks = await TaskModel.find({ parentTask: parentId });
    return res.status(200).json({
        size: foundTasks.length,
        foundTasks
    });
});

export const findByTag = asyncWrapper(async (req, res, next) => {
    const tagId = req.query.tag;

    const allTasks = await TaskModel.find({});
    const foundTasks = [];
    allTasks.forEach(task => {
        if (task.tags.includes(tagId)) {
            foundTasks.push(task);
        }
    });

    return res.status(200).json({
        size: foundTasks.length,
        foundTasks
    });
});

export const deleteTask = asyncWrapper(async (req, res, next) => {
    const deletedTask = await TaskModel.findByIdAndDelete(req.query.id);
    return res.status(200).json({ message: 'Task deleted' });
});