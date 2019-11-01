const router = require('express').Router();
const db = require('../data/helpers/projectModel');

// GET all projects
router.get('/', (req, res) => {
    db.get()
        .then(projects => res.status(200).json(projects))
        .catch (err => {
            console.log(err);
            res.status(500).json({ error: 'The projects could not be retrieved.' })
        })
})

// GET project by id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.get(id)
        .then(project => res.status(200).json(project))
        .catch (err => {
            console.log(err);
            res.status(500).json({ error: `The project with id ${id} could not be retrieved`})
        })
})

router.post("/", (req, res) => {
    const { name, description } = req.body;
    if (!name || !description) {
        return res.status(400).json({ error: "Need title and contents" });
    }
    db.insert({ name, description })
        .then(id => {
            console.log(id);
            res.status(200).json(id);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Error inserting post" });
        });
});

module.exports = router;