import mongoose from "mongoose";

import collections from "../utils/collections.js";

const courseSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    image: {type: String},
    numOfLearner: {type: Number, default: 0}
},{
    timestamps: true
})
const CourseModel = mongoose.model(collections.COURSES, courseSchema)

const findAllCourseDB = () => CourseModel.find()

export {
    findAllCourseDB
}