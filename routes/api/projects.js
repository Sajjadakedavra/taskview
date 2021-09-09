const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const config = require('config');
const auth = require('../../middleware/auth');


const Project = require('../../models/Projects');
const User = require('../../models/User');

// @route POST api/projects/create
// @desc  Create new project
// @access Private

router.post('/', auth, async (req, res) => {
    const user = await User.findOne({ user: req.user.id })
    console.log("asfafna ", req.body);
    if (user) {
        try {
            const project = await new Project({
                name: req.body.name,
                tasks: req.body.tasks
            }).save();

            if (project) {
                // await User.findByIdAndUpdate({ user: req.user.id }, { $push: { projects: project._id } })
                await user.projects.unshift(project._id);
                await user.save();
            }
            console.log(user)
            res.json({ msg: user.projects })

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
})


// @route POST api/projects/delete:id
// @desc  delete project by id
// @access Private
router.delete('/:id', auth, async (req, res) => {

    try {
        const project = await Project.findById(req.params.id);
        const user = await User.findOne({ user: req.user.id });

        if (!project) {
            return res.json({ msg: 'Post not found' });
        }

        await project.remove();
        project.save();
        const removeIndex = user.projects.map(project => project.user.toString()).indexOf(req.params.id);
        user.projects.splice(removeIndex, 1);
        user.save();

        res.json(user.projects);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})


module.exports = router;