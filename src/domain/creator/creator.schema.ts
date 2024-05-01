import { Schema, model } from "mongoose";

const CreatorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    comics: {
        type: [Schema.Types.ObjectId],
        ref: 'Comic'
    }
}, {
    timestamps: true
})

export default model('Creator', CreatorSchema)