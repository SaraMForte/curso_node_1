export class ProductsService {
    #repository

    constructor(repository) {
        this.#repository = repository
    }

    /**
     *
     * @returns {Array<{id: number, name: string, price: number}>}
     */
    getAllProducts() {
        return this.#repository.getAllProducts()
    }

    /**
     *
     * @param  {...string} productNames
     * @returns {Array<{id: number, name: string, price: number}>}
     */
    getProductsByName(...productNames) {
        return this.#repository.getProductsByName(...productNames)
    }

    /**
     *
     * @param {{id: number, name: string, price: number}} product
     */
    addProduct(product) {
        this.#repository.addProduct(product)
    }

    /**
     *
     * @param {string} productName
     * @throws {DataAccessError}
     */
    deleteProductByName(productName) {
        this.#repository.deleteProductByName(productName)
    }
}
