const express = require('express');
const router = express.Router();
// const { check, validationResult } = require('express-validator/check');
const config = require('config');
const auth = require('../../middleware/auth');


const Project = require('../../models/Projects');
const User = require('../../models/User');
const mongoose = require('mongoose');


/* ROUTES THAT ARE COMPLETED:
A) CREATE PROJECT
B) DELETE TASK
C) DELETE PROJECT
D) DELETE TASK
E) EDIT TASK
F) GET ALL TASKS */



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
                tasks: req.body.tasks,
                // comments: { _id: mongoose.Types.ObjectId(req.user.id), text: req.body.comments[0].text }
            }).save();

            if (project) {
                // await User.findByIdAndUpdate({ user: req.user.id }, { $push: { projects: project._id } })
                await user.projects.unshift(project._id);
                await user.save();
            }
            console.log(user)
            res.json({ project })

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

        // const removeIndex = user.projects.map(project => project._id.toString()).indexOf(req.params.id);
        // console.log(removeIndex)
        if (user.projects.filter(project => project._id.toString() === req.params.id).length > 0) {
            user.projects.map((project, index) => {
                // console.log("index is: ", index);
                if (project._id.toString() === req.params.id) {
                    // console.log("index matched at: ", index);
                    user.projects.splice(index, 1);
                }
            });
            // console.log(removeIndex)
        }
        await project.remove();
        await user.save();
        await project.save();
        return res.json({ msg: "project deleted" });
        // user.projects.map(project => console.log('\n', project._id.toString(), '\n'))
        // console.log(req.params.id)
        //user.projects.splice(removeIndex, 1);
        //await user.save();

        //res.json(user.projects);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})



// @route POST api/projects/:id
// @desc  add a new task to a project
// @access Private
router.put('/:id', auth, async (req, res) => {

    try {
        const user = await User.find({ user: req.user.id });
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.json({ msg: "project does not exist" });
        }

        // await Project.findByIdAndUpdate(req.user.id , { $push: { tasks: req.body.tasks } })
        // project.updateOne({ $push: { tasks: req.body.tasks } });
        //project.tasks.unshift(req.body.tasks);

        // let newProject = await Project.updateOne(
        //     { _id: req.params.id },
        //     { $push: { tasks: req.body.tasks } }, { new: true }
        // );

        // let newProject = await Project.findOneAndUpdate({ _id: req.params.id }, { $push: { tasks: req.body.tasks } } ); 
        let newProject = await Project.findOneAndUpdate({ _id: req.params.id }, { $push: { tasks: req.body.tasks } }, { new: true });

        let newestproject = await Project.findOneAndUpdate({ _id: req.params.id }, { $push: { alteration: { _id: mongoose.Types.ObjectId(req.user.id), editType: req.body.editType, documentRef: mongoose.Types.ObjectId(newProject.tasks[newProject.tasks.length - 1]._id) } } }, { new: true });
        console.log(`\n\nprojectd return: ${newestproject}\n\n`);

        // await project.save();

        res.json({ newestproject });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})




// @route POST api/projects/:project_id/:task_id
// @desc  alter/edit an existing task
// @access Private
router.patch('/:project_id/:task_id', auth, async (req, res) => {
    try {
        const project = await Project.findById(req.params.project_id);
        const taskArr = project.tasks;

        let index = taskArr.findIndex(task => task._id.toString() === req.params.task_id);

        if (index > -1) {
            taskArr[index] = { _id: mongoose.Types.ObjectId(req.params.task_id), ...req.body.task }
            await Project.updateOne({ _id: req.params.project_id }, { tasks: taskArr });
        }

        // taskArr.forEach(task => {
        //     if (task._id.toString() === req.params.task_id) {

        //     }
        // })

        // project.tasks.map(async (task, index) => {
        //     if (task._id.toString() === req.params.task_id) {

        //     }
        // });

        // if (project.tasks.filter(task => task._id.toString() === req.params.task_id).length > 0) {
        //     project.tasks.map(async (task, index) => {
        //         // console.log("index is: ", index);
        //         if (task._id.toString() === req.params.task_id) {
        //             // console.log("index matched at: ", index);
        //             project.tasks.splice(index, 1);
        //             await Project.updateOne(
        //                 { _id: req.params.project_id },
        //                 { $push: { tasks: req.body.task } },
        //             );
        //         }
        //     });
        // }


        // const projects = await Project.find({
        //     'tasks._id': {
        //         $in:
        //             ids

        //     }
        // }, function (err, docs) {
        //     if (err) throw err;
        //     console.log(docs);
        // });

        // let updated = await Project.findOneAndUpdate(
        //     { _id: req.params.project_id, "tasks._id": req.params.task_id },
        //     { task: req.body.task },
        //     { new: true, }
        // );
        // console.log(updated);


        // await project.save();
        res.json(project)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})




// @route POST api/projects/
// @desc  Get all projects of user
// @access Private
router.get('/', auth, async (req, res) => {

    try {
        const user = await User.findById(req.user.id);

        console.log(user.projects);

        const ids = user.projects

        const projects = await Project.find().where('_id').in(ids).exec();

        if (!projects) {
            return res.json({ msg: "no projects of this user" });
        }

        res.json({ projects });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});




// @route POST api/projects/:project_id/:task_id
// @desc  Delete a task in a project
// @access Private
router.delete('/:project_id/:task_id', auth, async (req, res) => {

    try {

        const project = await Project.findById(req.params.project_id);
        const taskArr = project.tasks;

        let index = taskArr.findIndex(task => task._id.toString() === req.params.task_id);

        if (index > -1) {
            taskArr.splice(index, 1);
            await Project.updateOne({ _id: req.params.project_id }, { tasks: taskArr });
        }

        res.json(project);

    } catch (err) {

        console.error(err.message);
        res.status(500).send('Server Error');

    }
})


module.exports = router;