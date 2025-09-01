const express = require('express');
const multer = require('multer');
const StudentController = require('../controllers/StudentController');
const router = express.Router();

const upload = multer({
    storage: multer.diskStorage({}),
    limits: { fileSize:10 * 1024 * 1024 },
});
//http://localhost:3000/add/student
router.post('/add/student', upload.single('studentImage'),  (req,res) => {
    StudentController.addStudent(req,res);
})
router.get('/delete/student/:_id', (req,res) => {
    StudentController.deleteStudent(req,res);
})
// router.get('/student/list', (req,res) => {

// })
router.get('/edit/student/page/:_id', (req,res) => {
    StudentController.openEditPage(req,res);
})
router.post('/edit/student/:_id', (req,res) => {
    StudentController.editStudent(req,res);
})


module.exports= router;