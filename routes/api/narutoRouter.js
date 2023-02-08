const express = require("express");
const {
    getAllNaruto,
    getOneNaruto,
    createOneNaruto,
    deleteOneNaruto,
    updateOneNaruto
} = require("../../controllers/api/narutoController");
const router = express.Router();

//localhot:4000/api/allNars
router.get("/allNars", getAllNaruto);

//localhost:4000/api/oneNaruto/:name
router.get("/oneNaruto/:name", getOneNaruto);
//localhost:4400/api/createOneNaruto
router.post("/createOneNar", createOneNaruto);
//localhost:4400/api/deleteOneNaruto/:name
router.delete("/deleteOneNaruto/:name", deleteOneNaruto);
// localhost:4400/api/updateOneNaruto/:name
router.put("/updateOneNaruto/:name", updateOneNaruto);
module.exports = router