import User from "../domain/user.js"

export default class UsersService {
    #repository
    #encryption
    #authorizer

    constructor(repository, encryption, tokenizer) {
        this.#repository = repository
        this.#encryption = encryption
        this.#authorizer = tokenizer
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
     * @returns {string}
     * @throws {Error}
     */
    async login({ email, password }) {
        try {
            const user = await this.#repository.findUserByEmail(email)

            if (await this.#encryption.compare(password, user.password)) {
                return this.#authorizer.generateToken(user.toLogged())
            }
            throw new Error("Incorrect password")
        } catch (error) {
            throw new Error(error.message, { cause: error.cause })
        }
    }

    /**
     * 
     * @param {User} user
     */
    async update(user) {
        try {
            const newUser = new User({ ...user })
            if (user.password) {
                const newPasswordEncrypted = await this.#encryption.encrypt(user.password)
                newUser.password = newPasswordEncrypted
            }

            await this.#repository.update(newUser)
        } catch (error) {
            throw new Error("User couldnt be updated", { cause: error })
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
    async getAll(loggedUser) {
        if (loggedUser.rol === "Admin") {
            return await this.#repository.getAll()
        }
        throw new Error("You arent a Admin")
    }
}
