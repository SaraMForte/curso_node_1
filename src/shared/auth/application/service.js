// eslint-disable-next-line no-unused-vars
import LoggedUser from "../domain/logged-user.js"

export default class AuthorizationService {
    #databaseRepository
    #tokenizerRepository

    constructor(databaseRepository, tokenizerRepository) {
        this.#databaseRepository = databaseRepository
        this.#tokenizerRepository = tokenizerRepository
    }

    generateToken(loggedUser) {
        return this.#tokenizerRepository.generate(loggedUser)
    }

    /**
     *
     * @param {LoggedUser} token
     * @returns {LoggedUser}
     */
    async decodeToken(token) {
        try {
            const decodedToken = this.#tokenizerRepository.decode(token)
            const loggedUser = await this.#databaseRepository.findByUserId(decodedToken.userId)
            if (loggedUser) {
                return loggedUser
            }
            throw new Error("Invalid token")
        } catch (error) {
            throw new Error("Error to verify token accesss", { cause: error.toString() })
        }
    }
}
