import { Router } from "express";

import { getAllCourse } from "../controllers/course.controller.js";

const CoureRouter = Router()

CoureRouter.get('', getAllCourse)

export default CoureRouter