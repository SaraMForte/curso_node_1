import AuthorizationService from "../../shared/auth/application/service.js"
import JwtTokenizer from "../../shared/auth/infrastructure/jwt-tokenizer.js"
import UsersService from "../application/service.js"
import BcryptEncryption from "./bcrypt-encription.js"
import Mysql2UserRepository from "./mysql2-repository.js"

const mysql2Repository = new Mysql2UserRepository()

const usersService = new UsersService(
    mysql2Repository,
    new BcryptEncryption(),
    new AuthorizationService(mysql2Repository, new JwtTokenizer())
)

export async function getAll(req, res) {
    try {
        res.json(await usersService.getAll(req.loggedUser))
    } catch (error) {
        res.json({ message: error.message, cause: error.cause })
    }
}

export async function register(req, res) {
    try {
        const { nombre, apellidos, edad, email, status, password, rol } = req.body
        await usersService.register({ nombre, apellidos, edad, email, status, password, rol })
        res.json({ message: "Registration successfull" })
    } catch (error) {
        res.json({ message: error.message, cause: error.cause })
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body
        const token = await usersService.login({ email, password })
        res.json({
            message: "Login sucessfull",
            token: token,
        })
    } catch (error) {
        res.json({ message: error.message, cause: String(error.cause) })
    }
}

export async function update(req, res) {
    try {
        const { id, nombre, apellidos, edad, email, status, password, rol } = req.body
        await usersService.update({ id, nombre, apellidos, edad, email, status, password, rol })
        res.json({ message: "Updated successfull" })
    } catch (error) {
        res.json({ message: error.message, cause: String(error.cause) })
    }
}

//Añadir numeros de respuesta de status
