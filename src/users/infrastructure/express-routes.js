import { Router } from "express"
import { getAll, login, register } from "./controllers.js"

const router = Router()

router.get("/", getAll)
router.post("/register", register)
router.post("/login", login)

export default router
