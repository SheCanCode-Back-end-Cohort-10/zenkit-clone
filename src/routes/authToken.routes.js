import express from 'express';
const tokenRouter = express.Router();
import { findByUser, addToken, deleteToken } from '../controllers/authToken.controller.js';

tokenRouter.post('/add', addToken);
tokenRouter.get('/findByUser', findByUser);
tokenRouter.delete('/delete', deleteToken);

export default tokenRouter;