import { NotFoundError, BadRequestError } from '../errors/index.js';
import TokenModel from '../models/authToken.model.js';
import { validationResult } from 'express-validator';
import asyncWrapper from '../middlewares/async.js';

export const addToken = asyncWrapper(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(new BadRequestError(errors.array()[0].msg));
    }

    const newToken = await TokenModel.create(req.body);
    return res.status(201).json(newToken);
});

export const findByUser = asyncWrapper(async (req, res, next) => {
    const tokenOwner = req.query.user;

    const foundToken = await TokenModel.findOne({ status: tokenOwner });
    return res.status(200).json({
        foundToken
    });
});

export const deleteToken = asyncWrapper(async (req, res, next) => {
    const deletedToken = await TokenModel.findByIdAndDelete(req.query.id);
    return res.status(200).json({ message: 'Token deleted' });
});