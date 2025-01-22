export default class TaskService {
    #repository
    constructor(repository) {
        this.#repository = repository
    }

    /**
     *
     * @param {number} taskId
     * @returns {{
     *     id: number,
     *      titulo: string,
     *      prioridad: string,
     *      ponderacion: number,
     *      usuario: {
     *          id: number,
     *          nombre: string,
     *          apellidos: string,
     *          edad: number,
     *          email: string,
     *          status: Boolean,
     *          fecha_registro: string
     *          }
     *      }
     * }
     */
    async findById(taskId) {
        return await this.#repository.findById(taskId)
    }

    /**
     *
     * @returns {Array<{
     *      id: number,
     *      titulo: string,
     *      prioridad: string,
     *      ponderacion: number,
     *      usuario: {
     *          id: number,
     *          nombre: string,
     *          apellidos: string,
     *          edad: number,
     *          email: string,
     *          status: Boolean,
     *          fecha_registro: string
     *          }
     *      }>
     * }
     */
    async findAll() {
        return await this.#repository.findAll()
    }

    /**
     *
     * @param {{titulo : string, prioridad : string, ponderacion : number, usuario_id : number}} task
     * @returns {insertId : number}
     */
    async persist(task) {
        return await this.#repository.persist(task)
    }

    /**
     *
     * @param {number} taskId
     * @param {{
     *      titulo : string,
     *      prioridad : string,
     *      ponderacion : number,
     *      usuario_id : number
     * }}
     * @returns {Array<{
     *      id: number,
     *      titulo: string,
     *      prioridad: string,
     *      ponderacion: number,
     *      usuario: {
     *          id: number,
     *          nombre: string,
     *          apellidos: string,
     *          edad: number,
     *          email: string,
     *          status: Boolean,
     *          fecha_registro: string
     *          }
     *      }>}
     */
    async update(taskId, { titulo, prioridad, ponderacion, usuario_id }) {
        return this.#repository.update(taskId, { titulo, prioridad, ponderacion, usuario_id })
    }

    /**
     *
     * @param {number} taskId
     */
    async remove(taskId) {
        return this.#repository.remove(taskId)
    }

    /**
     *
     * @param {string} priority
     * @returns {Array<{
     *      id: number,
     *      titulo: string,
     *      prioridad: string,
     *      ponderacion: number,
     *      usuario: {
     *          id: number,
     *          nombre: string,
     *          apellidos: string,
     *          edad: number,
     *          email: string,
     *          status: Boolean,
     *          fecha_registro: string
     *          }
     *      }>}
     */
    async findByPriority(priority) {
        return this.#repository.findByPriority(priority)
    }

    /**
     *
     * @param {number} min
     * @param {number} max
     * @returns {Array<{
     *      id: number,
     *      titulo: string,
     *      prioridad: string,
     *      ponderacion: number,
     *      usuario: {
     *          id: number,
     *          nombre: string,
     *          apellidos: string,
     *          edad: number,
     *          email: string,
     *          status: Boolean,
     *          fecha_registro: string
     *          }
     *      }>}
     */
    async findByWeighing(min, max) {
        return this.#repository.findByWeighing(min, max)
    }

    /**
     *
     * @returns {Array<{
     *          id: number,
     *          nombre: string,
     *          apellidos: string,
     *          edad: number,
     *          email: string,
     *          status: Boolean,
     *          fecha_registro: string
     *          }
     *      >}
     */
    async findAllUsers() {
        return this.#repository.findAllUsers()
    }

    /**
     *
     * @param {number} userId
     * @returns {{
     *          id: number,
     *          nombre: string,
     *          apellidos: string,
     *          edad: number,
     *          email: string,
     *          status: Boolean,
     *          fecha_registro: string
     *          }
     *      }
     */
    async findUserById(userId) {
        return this.#repository.findUserById(userId)
    }

    /**
     *
     * @param {number} taskId
     * @returns {{
     *          id: number,
     *          nombre: string,
     *          apellidos: string,
     *          edad: number,
     *          email: string,
     *          status: Boolean,
     *          fecha_registro: string
     *          }}
     */
    async findUserByTaskId(taskId) {
        return this.#repository.findUserByTaskId(taskId)
    }
}
