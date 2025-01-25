import { Router } from "express"
import { getAll, login, register, update } from "./controllers.js"
import { verifyToken } from "../../shared/auth/infrastructure/middleware.js"

const router = Router()

router.get("/", verifyToken, getAll)
router.post("/register", register)
router.post("/login", login)
router.post("/update", verifyToken, update)

export default router
