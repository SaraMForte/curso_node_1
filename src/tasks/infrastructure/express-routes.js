import { Router } from "express"
import {
    findAll,
    findAllUsers,
    findById,
    findByPriority,
    findByWeighing,
    findUserById,
    findUserByTaskId,
    persist,
    remove,
    update,
} from "./controllers.js"
import * as Middle from "./middleware.js"
//Tema del nombre wachina

const router = Router()

router.use(Middle.logMiddleware)

router.get("/", findAll)
router.post("/", persist)
router.post("/update/:id", update)
router.get("/priority/:priority", findByPriority)
router.post("/weighing", findByWeighing)
router.delete("/:id", remove)
router.get("/users", findAllUsers)
router.get("/users/:userId", findUserById)
router.get("/:id", findById)
router.get("/:id/users", findUserByTaskId)

export default router
