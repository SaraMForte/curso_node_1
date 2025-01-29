import StoryService from "../application/service.js"
import MongodbRepository from "./mongodb-repository.js"

const storyService = new StoryService(new MongodbRepository())

export async function getAll(req, res) {
    try {
        const stories = await storyService.getAll()
        res.json(stories)
    } catch (error) {
        res.json({ message: error.message })
        // Crear una funcion para el control de errores mas general
    }
}

export async function getById(req, res) {
    try {
        const story = await storyService.getById(req.params.storyId)
        res.json(story)
    } catch (error) {
        res.json({ message: error.message })
    }
}

export async function create(req, res) {
    try {
        await storyService.create(req.body)
        res.send("Se ha creado la historia")
    } catch (error) {
        res.json({ message: error.message })
    }
}

export async function updateById(req, res) {
    try {
        const storyUpdated = await storyService.updateById(req.params.storyId, req.body)
        res.json(storyUpdated)
    } catch (error) {
        res.json({ message: error.message })
    }
}

export async function deleteById(req, res) {
    try {
        const deletedStory = await storyService.deleteById(req.params.storyId)
        res.json(deletedStory)
    } catch (error) {
        res.json({ message: error.message })
    }
}
