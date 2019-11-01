const router = require('express').Router();
const db = require('../data/helpers/actionModel');

// Get action by id
router.get('/:project_id/:id', (req, res) => {
    const { id } = req.params;
    db.get(id)
        .then(action => res.status(200).json(action))
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: `The action with id ${id} could not be retrieved` })
        })
})

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

// Update action
router.put("/:project_id/:id", (req, res) => {
    const { id } = req.params;
    const { description, notes } = req.body;

    db.update(id, { description, notes })
        .then(updated => {
            res.status(200).json(updated);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Error updating action" });
        });
});

module.exports = router;