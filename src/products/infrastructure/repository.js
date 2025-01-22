import { dummyProducts } from "../../../dummy_data/dummyProducts.js"
import { DataAccessError } from "../application/errors.js"

export class DummyProductsRepository {
    /**
     *
     * @returns {Array<{id: number, name: string, price: number}>}
     */
    getAllProducts() {
        return dummyProducts
    }

    /**
     *
     * @param  {...string} productNames
     * @returns {Array<{id: number, name: string, price: number}>}
     */
    getProductsByName(...productNames) {
        const namesSet = new Set(productNames)
        return dummyProducts.filter((candidate) => namesSet.has(candidate.name))
    }

    /**
     *
     * @param {{id: number, name: string, price: number}} product
     */
    addProduct(product) {
        dummyProducts.push(product)
    }

    /**
     *
     * @param {string} productName
     * @throws {DataAccessError}
     */
    deleteProductByName(productName) {
        const nameIndex = dummyProducts.findIndex(
            (candidate) => candidate.name === productName
        )

        if (nameIndex === -1) {
            throw new DataAccessError("Dont exit this product")
        }
        dummyProducts.splice(nameIndex, 1)
    }
}
