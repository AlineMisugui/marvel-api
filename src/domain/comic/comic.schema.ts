import { Schema, model } from "mongoose";

const ComicSchema = new Schema({
    marvelId:{
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
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