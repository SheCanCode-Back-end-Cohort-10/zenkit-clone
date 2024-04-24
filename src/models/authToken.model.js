import { model, Schema } from "mongoose";

const TokenSchema = new Schema({
    token: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    expirationDate: {
        type: Date,
        required: true,
    }
});

const Token = model("Token", TokenSchema);
export default Token;