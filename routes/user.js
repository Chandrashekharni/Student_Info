const express = require('express');
const UserController = require('../controllers/UserController');
const router = express.Router();

//http://localhost:3000
router.get('/', (req,res) => {
    res.render('home');
})

router.get('/user/signup', (req,res) => {
    res.render('signup');
})

router.post('/add/user', (req,res) => {
    UserController.addUser(req,res);
})
//http"//localhost:3000/login
router.post('/login', (req,res) => {
    UserController.doLogin(req,res);
})
//http://localhost:3000/user/student/page
router.get('/student/add/page', (req,res) => {
    res.render('addStudent');
})
//http://localhost:3000/add/student
module.exports = router;