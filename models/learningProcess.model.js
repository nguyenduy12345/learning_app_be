import mongoose from "mongoose";

import collections from "../utils/collections.js";

const learningProcessSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    courses: [
        {
            course: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "courses",
            }
        }
    ],
    sectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "sections",
    },
    milestoneId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "milestones",
    },
    lessonId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "lessons",
    }
},{
    timestamps: true
})
const learningProcessModel = mongoose.model(collections.LEARNINGPROCESSES, learningProcessSchema)