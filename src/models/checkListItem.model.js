import { model, Schema } from "mongoose";

const CheckListItemSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    checked: {
        type: Boolean,
        required: true,
        default: false
    },
    task: {
        type: Schema.Types.ObjectId,
        ref: "CheckListItem",
        required: false,
    }
});

const CheckListItem = model("checkListItem", CheckListItemSchema);
export default CheckListItem;