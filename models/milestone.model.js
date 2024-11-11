import mongoose from "mongoose";

import collections from "../utils/collections.js";

const mileStoneSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    image: {type: String},
    sectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "sections",
        required: true,
    },
},{
    timestamps: true
})
const milestoneModel = mongoose.model(collections.MILESTONES, mileStoneSchema)