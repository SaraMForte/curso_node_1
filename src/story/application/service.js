export default class StoryService {
    #repository

    constructor(repository) {
        this.#repository = repository
    }

    async getAll() {
        return await this.#repository.getAll()
    }

    async getById(storyId) {
        return await this.#repository.getById(storyId)
    }

    async create(story) {
        return await this.#repository.create(story)
    }

    async updateById(storyId, storyData) {
        return await this.#repository.updateById(storyId, storyData)
    }

    async deleteById(storyId) {
        return await this.#repository.deleteById(storyId)
    }
}
