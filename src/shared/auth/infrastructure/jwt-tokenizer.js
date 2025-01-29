import jwt from "jsonwebtoken"

export default class JwtTokenizer {
    generate(loggedUser) {
        return jwt.sign(
            {
                userId: loggedUser.userId,
                rol: loggedUser.rol,
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: process.env.JWT_EXPIRATION_TIME }
        )
    }

    decode(token) {
        return jwt.verify(token, process.env.JWT_SECRET_KEY)
    }
}
