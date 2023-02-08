const express = require("express");
const router = express.Router();
const {
    renderAllNaruto,
    renderOneNaruto,
    renderCreateNarutoForm,
    renderUpdateNarutoForm,
    renderSignUpForm,
    renderLogInForm,
    renderUserPage,
    logOutUser
} = require("../../controllers/view/viewController");

router.get("/", (req, res) => {
    res.render("index");
})

router.get("/allNars", renderAllNaruto)
router.get("/oneNar/:name", renderOneNaruto);
router.get("/createOneNar", renderCreateNarutoForm);
router.get("/updateNar/:name", renderUpdateNarutoForm);


router.get("/signUp", renderSignUpForm);

router.get("/logIn", renderLogInForm);


//localhost:3000/user
router.get("/user", renderUserPage);


//localhost:3000/logout
router.get("/logout", logOutUser);


module.exports = router;