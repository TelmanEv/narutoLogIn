const mongoose = require("mongoose");
const Schema = mongoose.Schema

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true  
        },
        favoriteNaruto: {
            type: [{
                type: Schema.Types.ObjectId,
                ref: "Naruto",
                
            }]
        }
    }
)
const User = mongoose.model("User", userSchema);

module.exports = User