import { model, Schema } from "mongoose";

const TaskSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["Todo", "In Progress", "Completed", "Late", "Over-due"],
            message: "{VALUE} is not a valid status",
        },
        default: "Todo",
    },
    parentTask: {
        type: Schema.Types.ObjectId,
        ref: "Task",
        required: false,
    },
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'Tag',
        required: false
    }],
    checkList: [{
        name: {
            type: String,
            required: true,
        },
        checked: {
            type: Boolean,
            required: true,
            default: false
        }
    }],
    dueDate: {
        startDate: {
            type: Date,
            required: false,
        },
        endDate: {
            type: Date,
            required: false,
        },
        startTime: {
            type: String,
            required: false,
        },
        endTime: {
            type: String,
            required: false,
        },
        duration: {
            type: Number,
            required: false,
        },
        durationType: {
            type: String,
            required: false,
            enum: {
                values: ["Minutes", "Hours", "Days", "Weeks", "Months"],
                message: "{VALUE} is not a valid duration type",
            },
        }
    },
    workload: {
        type: Number,
        required: false,
        default: 0,
        min: 0,
        max: 5
    }
});

const Task = model("Task", TaskSchema);
export default Task;