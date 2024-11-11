import mongoose from "mongoose";

import collections from "../utils/collections.js";

const userSchema = new mongoose.Schema({
    fullName: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, unique: true, required: true},
    experiences: {type: Number, default: 0},
    hearts: {type: Number, default: 15},
    avatar: {type: String},
    gems: {type: Number, default: 0},
    sex: {type: Number, default: 1},
    dayStreak: {type: Number, default: 0},
    status: {type: Boolean, default: false},
},{
    timestamps: true
})
const UserModel = mongoose.model(collections.USERS, userSchema)

export default UserModel
