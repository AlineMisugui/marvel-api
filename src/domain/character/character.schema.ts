import { Schema, model } from "mongoose";

const CharacterSchema = new Schema({
    marvelId:{
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})

export default model('Character', CharacterSchema)