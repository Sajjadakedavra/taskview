const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    tasks: [
        {
            name: {
                type: String,
                required: true
            },
            description: {
                type: String
            },
            startDate: {
                type: Date
            },
            endDate: {
                type: Date,
                req: false
            }
        }
    ]
});


module.exports = Project = mongoose.model('project', ProjectSchema);