const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamps');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    rollNo: { type: String },
    studentName: { type: String },
    fatherName: { type: String, required: true },
    course: { type: String, required: true },
    branch: { type: String  },
    yearOfAdmisson: { type: String },
    studentImage: { type: String },
    createdAt: Date,
    updatedAt: Date
})
studentSchema.plugin(timestamps, {index: true });
module.exports = mongoose.model('Student', studentSchema);