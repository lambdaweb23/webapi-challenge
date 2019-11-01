const router = require('express').Router();
const db = require('../data/helpers/actionModel');

// Add action
router.post("/:project_id", (req, res) => {
    const { project_id } = req.params;
    const { description, notes } = req.body;

    if (!description || !notes) {
        return res.status(400).json({ error: "Action must include a description and notes" });
    }
    db.insert({ description, notes, project_id })
        .then(id => {
            console.log(id);
            res.status(200).json(id);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Error inserting action to database" });
        });
});

module.exports = router;