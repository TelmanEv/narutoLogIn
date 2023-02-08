const Naruto = require("../../models/narutoModel");

async function getAllNaruto(req, res) {
    try {
        let result = await Naruto.find({})
        res.json({
            message: "success",
            payload: result
        });
        // return result;
    } catch (err) {
        console.log(`getAllNaruto error: ${error}`)

        res.json({
            message: "failure",
            payload: err
        })
    }
}

async function getOneNaruto(req, res) {
    try {
        let result = await Naruto.find({ name: req.params.name });
        res.json({
            message: "success",
            payload: result
        })
    } catch (error) {
        //server-side message
        console.log(`getOneNaruto error: ${error}`);

        //client-side message
        res.json({
            message: "failure",
            payload: error
        })
    }
}

async function createOneNaruto(req, res) {
    try {
        let newNaruto = {
            name: req.body.name,
            village: req.body.village,
            clan: req.body.clan,
            personalities: req.body.personalities,
            appearance: req.body.appearance,
            specialabilities: req.body.specialabilities,
            relationships: req.body.relationships,
            motivations: req.body.motivations
        }
        await Naruto.create(newNaruto);

        res.redirect(`/oneNar/${newNaruto.name}`);
        // res.json({
        //     message: "success",
        //     payload: req.body
        // })
    } catch (error) {
        console.log(`createOneNaruto error: ${error}`);

        res.json({
            message: "failure",
            payload: `createOneNaruto error: ${error}`
        });
    }
}

async function deleteOneNaruto(req, res) {
    try {
        let deleteTarget = req.params.name

        // Find ONE document by name and remove it from the collection
        await Naruto.deleteOne({ name: deleteTarget });

        res.json({
            message: "success",
            payload: deleteTarget
        });

        // Return the client to the webpage that shows the entire collection
        res.redirect("/allNars");
    } catch (error) {
        // server-side
        console.log(`deleteOneNaruto error: ${error}`);

        // client-side
        res.json({
            message: "failure",
            payload: `deleteOneNaruto error: ${error}`
        });
    }
}

async function updateOneNaruto(req, res) {
    try {
        
        let updatedNar = {
            name: req.body.name,
            village: req.body.village,
            element: req.body.element,
            clan: req.body.clan,
            personalities: req.body.personalities,
            appearance: req.body.appearance,
            specialabilities: req.body.specialabilities, 
            relationships: req.body.relationships,
            motivations: req.body.motivations
        }

        await Naruto.updateOne(
            // Target the document to be updated
            { name: req.params.name },
            // Insert the document, with updated details, where it originally was
            { $set: updatedNar },
            // Upsert is update + insert. This setting is = true
            { upsert: true }
        )

        // res.json({
        //     message: "success",
        //     payload: updatedMon
        // })

        res.redirect(`/oneNar/${updatedNar.name}`);
    } catch (error) {
        // server-side
        console.log(`updateOneNaruto: ${error}`);

        // client-side
        res.json({
            message: "failure",
            payload: `updateOneNaruto: ${error}`
        })
    }
}

module.exports = {
    getAllNaruto,
    getOneNaruto,
    createOneNaruto,
    deleteOneNaruto,
    updateOneNaruto
}