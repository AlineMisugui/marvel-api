import { Schema, model } from "mongoose";

const ComicSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    publicationDate: {
        type: Date,
        required: true
    },
    coverImage: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})  

export default model('Comic', ComicSchema)