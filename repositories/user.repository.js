import UserModel from "../models/user.model.js";

export const createUser = (data) => UserModel.create(data)
export const findUser = (info) => UserModel.findOne(info)
export const findUserById = (id) => UserModel.findById(id).select("-password")
export const findUserByEmail = (email) => UserModel.findOne({email})
export const findUserAndUpdate = (...args) => UserModel.findByIdAndUpdate(...args)

