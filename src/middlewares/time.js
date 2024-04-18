import { durationCalculator } from '../utils/helperFunctions.js';

export const setTime = async (req, res, next) => {
    var startTime = "";
    var endTime = "";
    if (!req.body.dueData) {
        next();
    } else {
        if (req.body.dueDate.startDate) {
            startTime = new Date(req.body.dueDate.startDate.slice(0, -1)).toLocaleTimeString();
        }
        if (req.body.dueDate.endDate) {
            endTime = new Date(req.body.dueDate.endDate.slice(0, -1)).toLocaleTimeString();
        }
        req.body.dueDate.startTime = startTime;
        req.body.dueDate.endTime = endTime;
    
        const duration = durationCalculator(req.body.dueDate.startDate, req.body.dueDate.endDate);
        req.body.dueDate.duration = duration.durationPeriod;
        req.body.dueDate.durationType = duration.durationType;
    
        next();
    }
}