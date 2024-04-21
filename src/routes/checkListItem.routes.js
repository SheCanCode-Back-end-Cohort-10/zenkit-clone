import express from 'express';
const checkListItemRouter = express.Router();
import { addCheckListItemValidation } from '../utils/validation.js';
import { addCheckListItem, deleteCheckListItem, findByTaskId, getCheckListItems, updateCheckListItemStatus } from '../controllers/checklist.controller.js';

checkListItemRouter.post('/add', addCheckListItemValidation, addCheckListItem);
checkListItemRouter.get('/list', getCheckListItems);
checkListItemRouter.put('/update', updateCheckListItemStatus);
checkListItemRouter.get('/findById', findByTaskId);
checkListItemRouter.get('/findByParentId', findByTaskId);
checkListItemRouter.delete('/delete', deleteCheckListItem);

export default checkListItemRouter;