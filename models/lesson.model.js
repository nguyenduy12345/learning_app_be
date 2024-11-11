import mongoose from "mongoose";

import collections from "../utils/collections.js";

const lessonSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    experiences: {type: Number},
    gems: {type: Number},
    sectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "sections",
        required: true,
    },
    milestoneId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "milestones",
        required: true,
    },
    questions: [
        {
            question: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "questions",
                required: true,
            }
        }
    ]
},{
    timestamps: true
})
const lessonModel = mongoose.model(collections.LESSONS, lessonSchema)