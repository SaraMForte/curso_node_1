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
    return res.json(await usersService.getAll(req.loggedUser))
}

export async function register(req, res) {
    const { nombre, apellidos, edad, email, status, password, rol } = req.body
    await usersService.register({ nombre, apellidos, edad, email, status, password, rol })
    return res.json({ message: "Registration successfull" })
}

export async function login(req, res) {
    const { email, password } = req.body
    const token = await usersService.login({ email, password })
    return res.json({
        message: "Login sucessfull",
        token: token,
    })
}

export async function update(req, res) {
    const { id, nombre, apellidos, edad, email, status, password, rol } = req.body
    await usersService.update({ id, nombre, apellidos, edad, email, status, password, rol })
    return res.json({ message: "Updated successfull" })
}

//Añadir numeros de respuesta de status
