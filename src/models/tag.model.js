import { model, Schema } from "mongoose";

const TagSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
});

TagSchema.pre("save", function () {
    const colors = [
        '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
        '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
        '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
        '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC'
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    this.color = colors[randomIndex];
});

const Tag = model("Tag", TagSchema);
export default Tag;