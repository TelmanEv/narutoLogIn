//const { default: mongoose } = require("mongoose");
const { default: mongoose } = require("mongoose");
const mongooe = require("mongoose");
require("dotenv").config();
mongoose.set('strictQuery', false);
function connectToMongoDB() {
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => {
            console.log("MongoDB Connected")
        })
        .catch((error) => {
            console.log(`DB connection Failed
            failed: ${ error }`)
        });
}
module.exports = connectToMongoDB;