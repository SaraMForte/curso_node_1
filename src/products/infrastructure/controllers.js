import { ProductsService } from "../application/service.js"
import { DummyProductsRepository } from "./repository.js"

const productsService = new ProductsService(new DummyProductsRepository())

export function getAllProducts(req, res) {
    return res.json(productsService.getAllProducts())
}

export function getProductByName(req, res) {
    const productNames = typeof req.query.name === "string" ? [req.query.name] : req.query.name

    return res.status(200).json(productsService.getProductsByName(...productNames))
}

export function addProduct(req, res) {
    const data = req.body

    productsService.addProduct(data)

    res.end(`Added product with name ${data.name} at price of ${data.price}€`)
}

export function deleteProduct(req, res) {
    const productName = req.params.name

    productsService.deleteProductByName(productName)
    res.status(200).json({ message: `Product ${productName} deleted of data` })
}
