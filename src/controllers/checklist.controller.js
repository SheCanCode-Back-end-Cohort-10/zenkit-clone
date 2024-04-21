import { NotFoundError, BadRequestError } from '../errors/index.js';
import CheckListItemModel from '../models/checkListItem.model.js';
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

export const addCheckListItem = asyncWrapper(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(new BadRequestError(errors.array()[0].msg));
    }

    const newCheckListItem = await CheckListItemModel.create(req.body);
    return res.status(201).json(newCheckListItem);
});

export const getCheckListItems = async (req, res, next) => {
    const checkListItems = await CheckListItemModel.find({}).populate('tags');
    if (checkListItems) {
        return res.status(200).json({
            nbHits: checkListItems.length,
            checkListItems
        });
    }
}

export const updateCheckListItemStatus = async (req, res, next) => {
    const checkListItemId = req.query.id;
    const updates = req.body;

    const updatedCheckListItem = await CheckListItemModel.findByIdAndUpdate(checkListItemId, updates, { new: true });
    if (!updatedCheckListItem) {
        return next(new NotFoundError(`CheckListItem not found`));
    }
    return res.status(200).json(updatedCheckListItem);
}

export const findByTaskId = asyncWrapper(async (req, res, next) => {
    const taskId = req.query.task;

    const foundCheckListItems = await CheckListItemModel.find({ task: taskId });
    return res.status(200).json({
        nbHits: foundCheckListItems.length,
        foundCheckListItems
    });
});

export const deleteCheckListItem = asyncWrapper(async (req, res, next) => {
    const deletedCheckListItem = await CheckListItemModel.findByIdAndDelete(req.query.id);
    return res.status(200).json({ message: 'CheckListItem deleted' });
});