import mongoose from "mongoose";

import collections from "../utils/collections.js";

const questionSchema = new mongoose.Schema({
    type: {type: String, required: true},
    question: {type: String, required: true},
    description: {type: String},
    answers: {type: Array},
    words: {type: Array},
    audio: {type: Audio},
    paire: {type: Array},
    correct: {type: Number}
},{
    timestamps: true
})
const questionModel = mongoose.model(collections.QUESTIONS, questionSchema)