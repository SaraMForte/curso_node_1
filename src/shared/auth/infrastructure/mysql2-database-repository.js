import mysqlPool from "../../../mysql2-pool.js"
import LoggedUser from "../domain/logged-user.js"

export default class mysql2Repository {
    async findByUserId(userId) {
        try {
            const [result] = (
                await mysqlPool.query(`SELECT u.rol, u.id FROM usuarios u WHERE u.id= ?`, userId)
            )[0]
            if (result) {
                return new LoggedUser(result.id, result.rol)
            }
            throw new Error("User not found in database")
        } catch (cause) {
            throw new Error("Something went wrong", { cause })
        }
    }
}
