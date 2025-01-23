import express from "express"
import { errorHandler, notFoundHandler } from "./handlers.js"
import routes from "./express-routes.js"

export default function runExpressServer(port) {
    const server = express()

    server.use(express.json())
    server.use("/", routes)
    server.use(errorHandler)
    server.use(notFoundHandler)

    // Server init
    server.listen(port, () => {
        console.log(`Server listening port ${port}`)
    })
}
