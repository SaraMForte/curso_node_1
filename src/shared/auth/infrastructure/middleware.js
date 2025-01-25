import AuthorizationService from "../application/service.js"
import JwtTokenizer from "./jwt-tokenizer.js"
import mysql2Repository from "./mysql2-database-repository.js"

const authorizationService = new AuthorizationService(new mysql2Repository(), new JwtTokenizer())

export async function verifyToken(req, res, next) {
    try {
        if (!req.headers.token) {
            throw new Error("Token not insert in header")
        }

        const loggedUser = await authorizationService.decodeToken(req.headers.token)
        req.loggedUser = loggedUser

        next()
    } catch (error) {
        res.json({ message: error.message, error: error.cause })
    }
}
