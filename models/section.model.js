import mongoose from "mongoose";

import collections from "../utils/collections.js";

const sectionSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    image: {type: String},
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "courses",
        required: true,
    },
},{
    timestamps: true
})
const sectionModel = mongoose.model(collections.SECTIONS, sectionSchema)