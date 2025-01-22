import TaskService from "../application/service.js"
import { TaskRepository } from "./repository.js"

const taskService = new TaskService(new TaskRepository())

export async function findById(req, res) {
    res.json(await taskService.findById(Number(req.params.id)))
}

export async function findAll(req, res) {
    res.json(await taskService.findAll())
}

export async function persist(req, res) {
    res.json(await taskService.persist(req.body))
}

export async function update(req, res) {
    res.json(await taskService.update(req.params.id, req.body))
}

export async function remove(req, res) {
    try {
        await taskService.remove(req.params.id)
        res.status(200).json()
    } catch (error) {
        res.status(400).json({ error: error.message, cause: error.cause })
    }
}

export async function findByPriority(req, res) {
    res.json(await taskService.findByPriority(req.params.priority))
}

export async function findByWeighing(req, res) {
    const { min, max } = req.body
    console.log(min, max)
    res.json(await taskService.findByWeighing(min, max))
}

export async function findAllUsers(req, res) {
    return res.json(await taskService.findAllUsers())
}

export async function findUserById(req, res) {
    return res.json(await taskService.findUserById(req.params.userId))
}

export async function findUserByTaskId(req,res) {
    return res.json(await taskService.findUserByTaskId(req.params.id))
}

//refactorización a try catch
