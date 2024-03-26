import mongoose from "mongoose";

const {Schema}  = mongoose

const bookSchema = new Schema({
    tittle: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publishYear: {
        type: Number,
        required: true
    },

},
{
    timestamps: true
})

const Book = mongoose.model("Book", bookSchema)

export default Book