import bcrypt from "bcryptjs"

export default class BcryptEncryption {
    async encrypt(data) {
        return await bcrypt.hash(data, 10)
    }

    async compare(password, passwordEncrypted) {
        return await bcrypt.compare(password, passwordEncrypted)
    }
}
