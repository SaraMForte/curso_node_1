import { Schema, model } from "mongoose"

const storySchema = new Schema(
    {
        title: { type: String, require: true },
        author: String,
        description: String,
        price: Number,
        tags: [String],
        category: String,
        pages: Number,
        publishDate: Date,
    },
    {
        timestamps: true, //Define dos fechas: createdAt, updateAt
        versionKey: false, // Versionado del documento
    }
)

const Story = model("story", storySchema)

export default Story
