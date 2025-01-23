import mysqlPool from "../../mysql2-pool.js"

export default class TaskRepository {
    async findById(taskId) {
        try {
            const [result] = (
                await mysqlPool.query(
                    `SELECT t.*, u.nombre, u.apellidos, u.edad, u.email, u.status, u.fecha_registro 
                 FROM tareas t JOIN usuarios u ON t.usuario_id = u.id  WHERE t.id=?`,
                    taskId
                )
            )[0]

            return TaskRepository.#mapDBtoDomain(result)
        } catch (error) {
            throw new Error("Error in MySQL conecction", { cause: error })
        }
    }

    async findAll() {
        try {
            const [results] = await mysqlPool.query(
                `SELECT t.*, u.nombre, u.apellidos, u.edad, u.email, u.status, u.fecha_registro
                 FROM tareas t JOIN usuarios u ON t.usuario_id = u.id`
            )
            return results.map(TaskRepository.#mapDBtoDomain)
        } catch (error) {
            throw new Error("Error in MySQL conecction", { cause: error })
        }
    }

    async persist({ titulo, prioridad, ponderacion, usuario_id }) {
        try {
            const [result] = await mysqlPool.query(
                `INSERT INTO tareas (titulo, prioridad, ponderacion, usuario_id) VALUES (?,?,?,?)`,
                [titulo, prioridad, ponderacion, usuario_id]
            )
            return result.insertId
        } catch (error) {
            throw new Error("Error in MySQL conecction", { cause: error })
        }
    }

    async update(taskId, { titulo, prioridad, ponderacion, usuario_id }) {
        try {
            await mysqlPool.query(
                "UPDATE tareas SET titulo=?, prioridad=?, ponderacion=?, usuario_id=? WHERE id=?",
                [titulo, prioridad, ponderacion, usuario_id, taskId]
            )
            return await this.findById(Number(taskId))
        } catch (error) {
            throw new Error("Error in MySQL conecction", { cause: error })
        }
    }

    async remove(taskId) {
        try {
            await mysqlPool.query("DELETE FROM tareas WHERE id=?", [taskId])
        } catch (error) {
            throw new Error("Error in MySQL conecction", { cause: error })
        }
    }

    async findByPriority(priority) {
        try {
            const [result] = await mysqlPool.query(
                `SELECT t.*, u.nombre, u.apellidos, u.edad, u.email, u.status, u.fecha_registro 
                 FROM tareas t JOIN usuarios u ON t.usuario_id = u.id  WHERE t.prioridad=?`,
                priority
            )

            return result.map(TaskRepository.#mapDBtoDomain)
        } catch (error) {
            throw new Error("Error in MySQL conecction", { cause: error })
        }
    }

    async findByWeighing(min, max) {
        try {
            const [result] = await mysqlPool.query(
                `SELECT t.*, u.nombre, u.apellidos, u.edad, u.email, u.status, u.fecha_registro 
                 FROM tareas t JOIN usuarios u ON t.usuario_id = u.id  WHERE ponderacion BETWEEN ? AND ?`,
                [min, max]
            )

            return result.map(TaskRepository.#mapDBtoDomain)
        } catch (error) {
            throw new Error("Error in MySQL conecction", { cause: error })
        }
    }

    async findAllUsers() {
        try {
            const [result] = await mysqlPool.query(`SELECT * FROM usuarios`)

            return result.map(TaskRepository.#mapDBUserstoDomain)
        } catch (error) {
            throw new Error("Error in MySQL conecction", { cause: error })
        }
    }

    async findUserById(userId) {
        try {
            const [result] = (
                await mysqlPool.query(`SELECT u.* FROM usuarios u WHERE id=?`, userId)
            )[0]
            return TaskRepository.#mapDBUserstoDomain(result)
        } catch (error) {
            throw new Error("Error in MySQL conecction", { cause: error })
        }
    }

    async findUserByTaskId(taskId) {
        try {
            const [result] = (
                await mysqlPool.query(
                    `SELECT u.* FROM tareas t JOIN usuarios u ON t.usuario_id=u.id WHERE t.id=?`,
                    taskId
                )
            )[0]
            return TaskRepository.#mapDBUserstoDomain(result)
        } catch (error) {
            throw new Error("Error in MySQL conecction", { cause: error })
        }
    }

    // ---> Añadir Middleware

    static #mapDBtoDomain(dbData) {
        return {
            id: dbData.id,
            titulo: dbData.titulo,
            prioridad: dbData.prioridad,
            ponderacion: dbData.ponderacion,
            usuario: {
                id: dbData.usuario_id,
                nombre: dbData.nombre,
                apellidos: dbData.apellidos,
                edad: dbData.edad,
                email: dbData.email,
                status: Boolean(dbData.status),
                fecha_registro: dbData.fecha_registro,
            },
        }
    }

    static #mapDBUserstoDomain(dbUsersData) {
        return {
            id: dbUsersData.id,
            nombre: dbUsersData.nombre,
            apellidos: dbUsersData.apellidos,
            edad: dbUsersData.edad,
            email: dbUsersData.email,
            status: Boolean(dbUsersData.status),
            fecha_registro: dbUsersData.fecha_registro,
        }
    }
}
