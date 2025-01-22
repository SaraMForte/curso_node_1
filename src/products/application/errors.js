export class DataAccessError extends Error {
    constructor(message, options) {
        super("Error accessing data: " + message, options)
        this.name = "DataAccessError"
    }
}