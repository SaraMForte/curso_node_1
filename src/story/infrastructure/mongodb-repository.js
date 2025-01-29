import mongodb from "mongoose"

import Story from "../application/models.js"

mongodb.connect(process.env.MONGO_URL)

export default class MongodbRepository {
    async getAll() {
        try {
            const stories = await Story.find()
            return stories
        } catch (error) {
            throw new Error("Something went wrong", { cause: error })
        }
    }

    async getById(storyId) {
        try {
            const story = await Story.findById(storyId)
            return story
        } catch (error) {
            throw new Error("Something went wrong", { cause: error })
        }
    }

    async create(story) {
        try {
            await Story.create(story)
            return
        } catch (error) {
            throw new Error("Something went wrong", { cause: error })
        }
    }

    async updateById(storyId, storyData) {
        try {
            const updatedStory = await Story.findByIdAndUpdate(storyId, storyData, { new: true })
            return updatedStory
        } catch (error) {
            throw new Error("Something went wrong", { cause: error })
        }
    }

    async deleteById(storyId) {
        try {
            const deletedStory = await Story.findByIdAndDelete(storyId)
            return deletedStory
        } catch (error) {
            throw new Error("Something went wrong", { cause: error })
        }
    }
}
