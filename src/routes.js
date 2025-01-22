import { Router } from "express"
import clientsRouter from "./clients/routes.js"
import productsRouter from "./products/infrastructure/routes.js"
import userRouter from "./users/routes.js"
import taskRouter from "./tasks/infrastructure/routes.js"

const router = Router()

router.use("/users", userRouter)
router.use("/products", productsRouter)
router.use("/clients", clientsRouter)
router.use("/task", taskRouter)

export default router
