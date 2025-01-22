import { Router } from "express"
import { addProduct, deleteProduct, getAllProducts, getProductByName } from "./controllers.js"

const router = Router()

router.get("/", getAllProducts)
router.get("/get", getProductByName)
router.post("/add", addProduct)
router.delete("/delete/:name", deleteProduct)

export default router
