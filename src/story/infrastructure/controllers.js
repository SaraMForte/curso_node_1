import StoryService from "../application/service.js"
import MongodbRepository from "./mongodb-repository.js"

const storyService = new StoryService(new MongodbRepository())

export async function getAll(req, res) {
    const stories = await storyService.getAll()
    res.json(stories)
}

export async function getById(req, res) {
    const story = await storyService.getById(req.params.storyId)
    res.json(story)
}

export async function create(req, res) {
    await storyService.create(req.body)
    res.send("Se ha creado la historia")
}

export async function updateById(req, res) {
    const storyUpdated = await storyService.updateById(req.params.storyId, req.body)
    res.json(storyUpdated)
}

export async function deleteById(req, res) {
    const deletedStory = await storyService.deleteById(req.params.storyId)
    res.json(deletedStory)
}
