// eslint-disable-next-line no-unused-vars
export function notFoundHandler(req, res, next) {
    res.status(404).json({
        message: "Not found",
    })
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
    console.log(err)
    if (err.cause) {
        res.status(500).json({ message: err.message, cause: String(err.cause) })
    }
    res.status(500).json({ message: err.message })
}
