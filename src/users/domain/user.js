export default class User {
    /**
     *
     * @param {{
     *      id : number
     *      nombre : string,
     *      apellidos : string,
     *      edad : number,
     *      email : string,
     *      status : Boolean,
     *      password : string,
     *      fechaRegistro : Date
     *      rol: string }}
     */
    constructor({ id, nombre, apellidos, edad, email, status, fechaRegistro, password, rol }) {
        this.id = id
        this.nombre = nombre
        this.apellidos = apellidos
        this.edad = edad
        this.email = email
        this.status = status
        this.fechaRegistro = fechaRegistro
        this.password = password
        this.rol = rol
    }

    get() {
        return {...this}
    }

    toLogged() {
        return {
            userId: this.id,
            rol: this.rol,
        }
    }
}
