import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()

import CoureRouter from "./routes/course.route.js"
import UserRouter from "./routes/user.route.js"
import { register, logIn } from "./controllers/user.controller.js"
import authMiddleware from "./middlewares/auth.middlewares.js"
import localizationMiddleware from "./middlewares/localization.middlewares.js"
import { validateRegisterRequest, validateLoginRequest } from "./validations/userRequest.validation.js"

await mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("database connected!"))

const PORT = process.env.PORT_LOCAL || 8080

const app = express()
app.use(express.json())
app.use(cors())

app.use(localizationMiddleware.applyLocalization)

app.post("/api/v1/register",validateRegisterRequest, register)
app.post("/api/v1/login",validateLoginRequest, logIn)

app.use(authMiddleware.authentication)

app.use("/api/v1/courses", CoureRouter)
app.use("/api/v1/users", UserRouter)

app.listen(PORT, (err) => {
    if(err) throw new Error(err)
    console.log(`Server is running PORT: ${PORT}`)
})