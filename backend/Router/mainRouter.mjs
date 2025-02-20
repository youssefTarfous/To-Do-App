import { Router } from "express"
import router from "./tasks.router.mjs"


const mainRouter = Router()

mainRouter.use("/tasks", router)

export default mainRouter