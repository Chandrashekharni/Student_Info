const Student = require('../models/Student');
const cloudinary = require('cloudinary').v2;

async function addStudent(req,res) { 
    try {
         let result;
        // console.log('req.body',req.body);
        // console.log('req.file',req.file);
        if(req.file) {
            cloudinary.config({
                cloud_name: 'dibx8zafy',
                api_key: '499147683674967',
                api_secret: '44pU1MC67vXa7VXmIupxcdPYgNI'
            })
             result = await cloudinary.uploader.upload(req.file.path);
            // console.log('result',result);
        }
        let student = new Student(req.body);
        if(req.file){
             student.studentImage = result.secure_url;
        }
        await student.save();
        // console.log("Data base updated..");
        let students = await Student.find({});
        res.render('studentlist', {
            students: students
        });  
    } catch (error) {
         console.log(error);   
    }
}

async function deleteStudent(req,res) {
    try {
        let studentId = req.params._id;
        console.log('studentId', studentId);
        await Student.deleteOne({ _id: studentId});
        let students = await Student.find({});
        res.render('welcomeadmin', {
            students : students
        })
    } catch (error) {
        console.log(error); 
    }
}

// async function studentList(req,res) {
//     try {
        
//     } catch (error) {
//         console.log(error);
        
//     }
// }
async function openEditPage(req,res) {
    try {
        let studentId = req.params._id;
        let student = await Student.findOne({ _id: studentId });
        if(student) {
            res.render('studenteditpage', {
                student: student
            })
        } else {
            res.render('/');
        }
        
    } catch (error) {
        console.log(error); 
    }
}

async function editStudent(req,res) {
    try {
        const studentId = req.params._id;
        // console.log('studentId', studentId);
        let student = await Student.findOne({ _id: studentId });
        if(student) {
            console.log('req.body', req.body);
            student.rollNo = req.body.rollNo;
            student.studentName = req.body.studentName;
            student.fatherName = req.body.fatherName;
            student.course = req.body.course;
            student.branch = req.body.branch;
            student.yearOfAdmisson = req.body.yearOfAdmisson;
            await student.save();
            let students = await Student.find({});
            res.render('welcomeadmin', {
                students: students
            })
        } else {
            res.end("Student not found....");
        }
        
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = {
    addStudent,
    deleteStudent,
    openEditPage,
    editStudent
}