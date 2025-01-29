import { isValidObjectId } from "mongoose"
import Story from "../application/models.js"

export async function checkStoryId(req, res, next) {
    const { storyId } = req.params

    // ¿story Id es un objeto con formato valido?
    if (!isValidObjectId(storyId)) {
        return res.status(400).json({ message: "Invalid story id" })
    }

    // ¿Existe el storyId en la base de datos?
    const story = await Story.findById(storyId)
    if (!story) {
        return res.status(400).json({ message: "Not found story with id:" + storyId })
    }

    next()
}
