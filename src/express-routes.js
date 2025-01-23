import { Router } from "express"
import clientsRouter from "./clients/routes.js"
import productsRouter from "./products/infrastructure/routes.js"
import userRouter from "./users/infrastructure/express-routes.js"
import taskRouter from "./tasks/infrastructure/express-routes.js"

const router = Router()

router.use("/users", userRouter)
router.use("/task", taskRouter)
router.use("/products", productsRouter)
router.use("/clients", clientsRouter)

export default router
