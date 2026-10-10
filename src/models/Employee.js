const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    employeeId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    skills: {
        type: [String],
        default: []
    },
    status: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Employee', employeeSchema);
