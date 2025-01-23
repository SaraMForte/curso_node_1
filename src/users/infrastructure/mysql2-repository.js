import mysqlPool from "../../mysql2-pool.js"

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

    async login(email) {
        try {
            const [result] = (
                await mysqlPool.query(`SELECT * FROM usuarios u WHERE email=?`, email)
            )[0]
            if (result.email) {
                return result.password
            }
        } catch (cause) {
            throw new Error("Something went wrong", { cause })
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
