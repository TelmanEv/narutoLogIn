const express = require("express");
const router = express.Router();
const {
    createUser,
    logInUser,
    addFavoriteNarutoToUser
} = require("../../controllers/api/userController");
router.post("/createUser", createUser);
router.post("/logInUser", logInUser);
router.put("/addFavoriteNaruto", addFavoriteNarutoToUser);

module.exports = router;