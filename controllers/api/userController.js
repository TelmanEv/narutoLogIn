const User = require("../../models/userModel");

const bcrypt = require("bcrypt");
const Naruto = require("../../models/narutoModel");

async function createUser(req, res) {
    try {
        //Gather user credentials from the client
        const { username, password } = req.body
        
        //Generate salt
        let salt = await bcrypt.genSalt(10);

        //Encrypt the password with the salt 
        let encryptedPassword = await bcrypt.hash(password, salt);

        // Generate user document
        let userObj = {
            username: username,
            password: encryptedPassword
        }

        //Insert the user document into the database
        await User.create(userObj);


        res.redirect("/logIn")
    } catch (err) {
        console.log(`createUser error: ${err}`);

        //client side
        res.json({
            message: "failure",
            payload: `createUser error : ${err}`
        })
    }
}


async function logInUser(req, res) {
    try {
        // findOne User that matches the username from the sign in form
        const user = await User.findOne({ username: req.body.username });

        // If no user, throw error. Otherwise, compare passwords
        if(!user){
            throw "User not found, please sign up";
        } else {
            // bcrypt compares the incoming password with the database password
            let comparedPassword = await bcrypt.compare(
                req.body.password,
                user.password
            )

            // If the password is incorrect, throw an error. Otherwise, begin server session
            if(!comparedPassword) {
                throw "Please check your password and try again"
            } else {
                // Give the server login authority
                req.session.isAuth = true;

                // Generate user object to attach to the server-side session
                let userObj = {
                    username: user.username,
                    id: user._id
                }

                // Server-side session holds info about the user
                req.session.user = userObj;

                // This route can only be seen if req.session.isAuth is set to true
                res.redirect("/user");
            } // end of "password compare" actions
        } // end of "user found" actions
    } catch (err) {
        // server-side
        console.log(`logInUser error: ${err}`);

        // client-side
        res.json({
            message: "failure",
            payload: `logInUser error: ${err}`
        })
    }
}

async function addFavoriteNarutoToUser(req, res) {
    try {
       

        let userId = req.session.user.id


        let narutoId = req.body.narutoId


        let currentUser = await User.findOne({ _id: userId });


        let isAlreadyFavorite = currentUser.favoriteNaruto.includes(narutoId);

        if (isAlreadyFavorite) {
            throw "Error: Ninja is already on favorites"
        } else {

            currentUser.favoriteNaruto.push(narutoId);


            await currentUser.save()
            
           
            res.redirect("/user");
        }
    } catch (err) {
        console.log(`addFavoriteNarutoToUser error: ${err}`);
    }
}


module.exports = {
    createUser,
    logInUser,
    addFavoriteNarutoToUser
}