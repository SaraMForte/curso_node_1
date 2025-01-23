import UsersService from "../application/service.js"
import BcryptEncryption from "./bcrypt-encription.js"
import Mysql2UserRepository from "./mysql2-repository.js"

const usersService = new UsersService(new Mysql2UserRepository(), new BcryptEncryption())

export async function getAll(req, res) {
    try {
        res.json(await usersService.getAll())
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
        await usersService.login({ email, password })
        res.json({ message: "Login sucessfull" })
    } catch (error) {
        res.json({ message: error.message, cause: String(error.cause) })
    }
}

//Añadir numeros de respuesta de status
