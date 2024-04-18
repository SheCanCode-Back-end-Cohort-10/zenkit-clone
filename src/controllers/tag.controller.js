import { NotFoundError, BadRequestError } from '../errors/index.js';
import TagModel from '../models/tag.model.js';
import { validationResult } from 'express-validator';

export const addTag = async (req, res, next) => {
    const errors = validationResult(req);
    try {
        if (!errors.isEmpty()) {
            next(new BadRequestError(errors.array()[0].msg));
        }

        const newTag = await TagModel.create(req.body);
        return res.status(201).json(newTag);
    } catch (error) {
        next(error);
    }
};

export const getTags = async (req, res, next) => {
    try {
        const tags = await TagModel.find({});
        if (tags) {
            return res.status(200).json({ 
                tags
            });
        }
    } catch (error) {
        next(error);
    }
}

export const updateTag = async (req, res, next) => {
    const tagId = req.query.id;
    const updates = req.body;

    try {
        const updatedTag = await TagModel.findByIdAndUpdate(tagId, updates, { new: true });
        if (!updatedTag) {
            return next(new NotFoundError(`Tag not found`));
        } 
        return res.status(200).json(updatedTag);
    } catch (error) {
        next(error);
    }
}

export const findById = async (req, res, next) => {
    const tagId = req.query.id;
    
    try {
        const foundTag = await TagModel.findById(tagId);
        if (!foundTag) {
            return next(new NotFoundError(`Tag not found`));
        }
        return res.status(200).json(foundTag);
    } catch (error) {
        next(error);
    }
}

export const deleteTag = async (req, res, next) => {
    try {
        const deletedTag = await TagModel.findByIdAndDelete(req.query.id);
        return res.status(200).json({ message: 'Tag deleted'});
    } catch (error) {
        next(error);
    }
}