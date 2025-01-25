
import dayjs from "dayjs"
import fs from "node:fs/promises"

export function textMiddleware(req, res, next) {
    console.log("Se ha ejecutado el middleware de JS")
    next()
}

export async function logMiddleware(req, res, next) {
    const currentDate = dayjs().format("DD-MM-YYYY HH:mm:ss")
    const text = `[ ${currentDate} ] - Method: ${req.method} - Url: ${req.url}\n`

    await fs.appendFile("./log", text)
    next()
}

export async function blockMiddleware(req, res, next) {
    const random = Math.random()
    console.log(random)

    if (random >= 0.8) {
        return res.status(401).send("You cant access")
    }
    return next()
}
