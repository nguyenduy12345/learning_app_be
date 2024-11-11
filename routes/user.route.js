import { Router } from "express";
import multer from "multer";

import { profile, updateProfile, handleChangeAvatar } from "../controllers/user.controller.js";
import { validateUpdateAvatarRequest, validateUpdateUserRequest } from "../validations/userRequest.validation.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const UserRouter = Router()
UserRouter.get('/', profile)
UserRouter.patch('/avatar', upload.single("file") , validateUpdateAvatarRequest, handleChangeAvatar)
UserRouter.patch('/', validateUpdateUserRequest, updateProfile)

export default UserRouter