import { findAllCourseDB } from "../models/course.model.js";

const getAllCourse = async(req, res) =>{
    try {
        const courses = await findAllCourseDB()
        res.status(200).send({
            courses
        });
    } catch (error) {
        res.status(201).send({
            message: error.message,
        });
    }
}

export { getAllCourse }