import { Router } from "express"
import { create, deleteById, getAll, getById, updateById } from "./controllers.js"
import { checkStoryId } from "./middleware.js"

const router = Router()

router.get("/", getAll) // Recupera todas las historias
router.get("/:storyId", checkStoryId, getById) // Recupera una unica historia
router.post("/", create) // Crea una nueva historia
router.put("/:storyId", updateById) // Actualiza una historia
router.delete("/:storyId", deleteById) // Elimina una historia

export default router
