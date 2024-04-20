import { NotFoundError, BadRequestError } from '../errors/index.js';
import asyncWrapper from '../middlewares/async.js';
import TagModel from '../models/tag.model.js';
import { validationResult } from 'express-validator';

export const addTag = asyncWrapper(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(new BadRequestError(errors.array()[0].msg));
    }

    const newTag = await TagModel.create(req.body);
    return res.status(201).json(newTag);
});

export const getTags = asyncWrapper(async (req, res, next) => {
    const tags = await TagModel.find({});
    if (tags) {
        return res.status(200).json({
            nbHits: tags.length,
            tags
        });
    }
})

export const updateTag = asyncWrapper(async (req, res, next) => {
    const tagId = req.query.id;
    const updates = req.body;

    const updatedTag = await TagModel.findByIdAndUpdate(tagId, updates, { new: true });
    if (!updatedTag) {
        return next(new NotFoundError(`Tag not found`));
    } 
    return res.status(200).json(updatedTag);
});

export const findById = asyncWrapper(async (req, res, next) => {
    const tagId = req.query.id;
    
    const foundTag = await TagModel.findById(tagId);
    if (!foundTag) {
        return next(new NotFoundError(`Tag not found`));
    }
    return res.status(200).json(foundTag);
});

export const deleteTag = asyncWrapper(async (req, res, next) => {
    const deletedTag = await TagModel.findByIdAndDelete(req.query.id);
    return res.status(200).json({ message: 'Tag deleted'});
});