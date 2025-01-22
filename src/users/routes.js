import { Router } from "express"

const router = Router()

router.get("/", (req, res) => {
    res.end("Lista Usuarios")
})

router.get("/:id", (req, res) => {
    res.end(`Usuario con ID ${req.params.id}`)
})

export default router 
