const router = require('express').Router();
const db = require('../data/helpers/actionModel');



router.get("/actions/:project_id", (req, res) => {
    res.send("working");
})

module.exports = router;