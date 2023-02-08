const Naruto = require("../../models/narutoModel");
const User = require("../../models/userModel");
async function renderAllNaruto(req, res) {
    try {
        let result = await Naruto.find({});

        res.render("allNars", {naruto: result})
    } catch (error) {
        console.log(`renderAllNaruto error: ${error}`);
    }
}

async function renderOneNaruto(req, res) {
    try {
        // console.log(`req.params.name: ${req.params.name}`);

        // This returns array, even if it's just one result.
        let result = await Naruto.find({ name: req.params.name });

        // console.log(`result ${result}`);

        /*
            21. Modify renderOnePokemon() to show the page based on the login session
        */
        let userFaves
if (req.session.isAuth) {
    let currentUser = await User.findOne({ username: req.session.user.username });
    userFaves = currentUser.favoriteNaruto
} else {
    userFaves = []
}

// Use oneMon.ejs file, all data will be in pokemon

res.render("oneNar", { naruto: result[0], loggedIn: req.session.isAuth, userFaves: userFaves });
    } catch (error) {
        console.log(`renderOneNaruto error: ${error}`);
    }
}
async function renderCreateNarutoForm(req, res) {
    try {
        res.render("createNar");
    } catch (error) {
        console.log(`renderCreateNarutoForm error: ${error}`);
    }
}
async function renderUpdateNarutoForm(req, res) {
    try {
        // Target the correct document to be updated
        let result = await Naruto.find({ name: req.params.name });

        // Render the update form with the filled-in original info
        res.render("updateNar", { naruto: result[0] });
    } catch (error) {
        console.log(`renderUpdateNarutoForm error: ${error}`);
    }
}

async function renderSignUpForm(req, res) {
    try {
        res.render("signUp");
    } catch (error) {
        console.log(`renderSignUpForm error: ${error}`)
    }
}

async function renderLogInForm(req, res) {
    try {
        res.render("logIn");
    } catch (error) {
        console.log(`renderLogInForm error: ${error}`);
    }
}


/*
    11. B) Set up front-end function to render user page
*/
async function renderUserPage(req, res) {
    try {
        if (req.session.isAuth) {
            let currentUser = await User.findOne({ _id: req.session.user.id })
            let narutoNameList = []

            for (let i = 0; i < currentUser.favoriteNaruto.length; i++){
                let oneNaruto = await  Naruto.findOne({ _id: currentUser.favoriteNaruto[i] });
                narutoNameList.push(oneNaruto.name);
            }
            res.render("user", {
                username: currentUser.username,
                favoriteNaruto: narutoNameList
            });

        } else {
            res.redirect("/logIn")
        }
    } catch (error) {
        console.log(`renderUserPage error: ${error}`)
    }
}

async function logOutUser(req, res) {
    try {
        // Clear the cookie from the browser
        res.clearCookie("connect.sid", {
            path: "/",
            httpOnly: true,
            secure: false,
            maxAge: null
        });

        // Clear the session from the server
        req.session.destroy();

        // send the client to the log in page
        res.redirect("/logIn");
    } catch (error) {
        console.log(`logOutUser error: ${error}`);
    }
}
module.exports = {
    renderAllNaruto,
    renderOneNaruto,
    renderCreateNarutoForm,
    renderUpdateNarutoForm,
    renderSignUpForm,
    renderLogInForm,
    renderUserPage,
    logOutUser
    
}