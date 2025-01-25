import mysqlPool from "../../mysql2-pool.js"
import User from "../domain/user.js"

export default class Mysql2UserRepository {
    async register({ nombre, apellidos, edad, email, status, passwordEncrypted, rol }) {
        try {
            await mysqlPool.query(
                `INSERT INTO usuarios (nombre, apellidos, edad, email, status, password, rol) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [nombre, apellidos, edad, email, status, passwordEncrypted, rol]
            )
        } catch (cause) {
            throw new Error("Something went wrong", { cause })
        }
    }

    async update(user) {
        const userObject = user.get()
        const updates = {} 


        for (const key in userObject) {
            if (typeof userObject[key] !== "undefined" && key !== "id") {
                updates[key] = userObject[key]
            }
        }

        try {
            await mysqlPool.query("UPDATE usuarios u SET ? WHERE u.id = ?", [updates, user.id])
        } catch (cause) {
            console.error(cause)
            throw new Error("Something went wrong", { cause })
        }
    }

    async findUserByEmail(email) {
        try {
            const [result] = (
                await mysqlPool.query(`SELECT * FROM usuarios u WHERE email=?`, email)
            )[0]
            if (result) {
                return new User(this.#toDomainUser(result))
            }
            throw new Error("User not found in database")
        } catch (cause) {
            throw new Error("Something went wrong", { cause })
        }
    }

    #toDomainUser(result) {
        return {
            id: result.id,
            nombre: result.nombre,
            apellidos: result.apellidos,
            edad: result.edad,
            email: result.email,
            status: result.status,
            fechaRegistro: result.fecha_registro,
            password: result.password,
            rol: result.rol,
        }
    }

    async getAll() {
        try {
            const [result] = await mysqlPool.query(`SELECT * FROM usuarios`)
            return result
        } catch (cause) {
            throw new Error("Something went wrong", { cause })
        }
    }
}
