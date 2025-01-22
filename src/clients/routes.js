import { Router } from "express"
import getClients from "./get-clients.js"

const router = Router()

router.get("/", getClients)

export default router
