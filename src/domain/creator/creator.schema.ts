import { Schema, model } from "mongoose";

const CreatorSchema = new Schema({
    marvelId:{
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    comics: {
        type: [String],
        required: true
    }
}, {
    timestamps: true
})

export default model('Creator', CreatorSchema)