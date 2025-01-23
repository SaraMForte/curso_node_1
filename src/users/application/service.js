export default class UsersService {
    #repository
    #encryption

    constructor(repository, encryption) {
        this.#repository = repository
        this.#encryption = encryption
    }

    /**
     *
     * @param {{
     *      nombre : string,
     *      apellidos : string,
     *      edad : number,
     *      email : string,
     *      status : Boolean,
     *      password : string,
     *      rol: string }}
     */
    async register({ nombre, apellidos, edad, email, status, password, rol = "Client" }) {
        const passwordEncrypted = await this.#encryption.encrypt(password)
        return this.#repository.register({
            nombre,
            apellidos,
            edad,
            email,
            status,
            passwordEncrypted,
            rol,
        })
    }

    /**
     *
     * @param {{email, password}}
     * @returns {true}
     * @throws {Error}
     */
    async login({ email, password }) {
        try {
            const passwordEncrypted = await this.#repository.login(email)
            if (await this.#encryption.compare(password, passwordEncrypted)) {
                return true
            }
            throw new Error("Incorrect password")
        } catch (error) {
            throw new Error(error.message, { cause: error.cause })
        }
    }

    /**
     *
     * @returns {Array<{
     *      nombre : string,
     *      apellidos : string,
     *      edad : number,
     *      email : string,
     *      status : Boolean,
     *      password : string,
     *      rol: string }>}
     */
    async getAll() {
        return await this.#repository.getAll()
    }
}
