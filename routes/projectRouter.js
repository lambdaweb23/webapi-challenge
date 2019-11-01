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
        return res.status(400).json({ error: "Project must include a name and description" });
    }
    db.insert({ name, description })
        .then(id => {
            console.log(id);
            res.status(200).json(id);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Error inserting project to database" });
        });
});

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    db.update(id, { name, description })
        .then(updated => {
            res.status(200).json(updated);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Error updating project" });
        });
});

router.delete("/:id", (req, res) => {
    const { id } = req.params;

    db.remove(id)
        .then(removed => {
            if (removed) {
                res.status(204).end();
            } else {
                res.status(404).json({ error: `Project with id ${id} does not exist` });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Error deleting project" });
        });
});

module.exports = router;