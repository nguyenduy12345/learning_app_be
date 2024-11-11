import mongoose from "mongoose";

import collections from "../utils/collections.js";

const summaryLessonSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    lessonId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "lessons"
    },
    point: {type: Number, default: 0}
},{
    timestamps: true
})
const summaryLessonModel = mongoose.model(collections.SUMMARYLESSONS, summaryLessonSchema)