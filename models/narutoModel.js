const mongoose = require("mongoose");

const narutoSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
        },
        village: {
            type: String,
            required: true
        },
        element: {
            type: String,
            require: true
        },
        clan: {
            type: String
        },
        personalities:{
            type: String
        },
        appearance:{
            type: String
        },
        specialabilities:{
            type: String
        },
        relationships:{
            type: String
        },
        motivations:{
            type: String
        }
    }
)

const Naruto = mongoose.model("Ninja", narutoSchema);
module.exports = Naruto;
