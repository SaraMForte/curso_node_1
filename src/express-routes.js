import { Router } from "express"
import clientsRouter from "./clients/routes.js"
import productsRouter from "./products/infrastructure/routes.js"
import userRouter from "./users/infrastructure/express-routes.js"
import taskRouter from "./tasks/infrastructure/express-routes.js"
import storyRouter from "./story/infrastructure/routes.js"

const router = Router()

router.use("/users", userRouter)
router.use("/task", taskRouter)
router.use("/products", productsRouter)
router.use("/clients", clientsRouter)
router.use("/story", storyRouter)

export default router
