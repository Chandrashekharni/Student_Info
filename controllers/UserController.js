
const User = require("../models/User");
const Student = require('../models/Student');
const bcrypt = require('bcrypt');


async function addUser(req, res) {
    try {
        // console.log(' req.body', req.body);
        let user = new User(req.body);
        let encryptredPassword = bcrypt.hashSync(req.body.password, 10);
        // console.log(encryptredPassword);
        user.password = encryptredPassword;
        await user.save();
        // console.log("Data save successfully...");
        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
}

async function doLogin(req, res) {
    try {
        // console.log('req.body', req.body);
        let user = await User.findOne({ email: req.body.email });
        // console.log('user', user);
        if (user) {
            let validPassword = await bcrypt.compare(req.body.password, user.password);
            if (validPassword) {
                if (user.userType === 'Admin') {
                    let students = await Student.find({});
                    res.render('welcomeadmin', {
                        students: students
                    });

                } else {
                    res.render('welcomestudent');
                }
            } else {
                res.end("<h1> Invalid Email/Password...")
            }

        } else {
            res.end("<h1> User does not exists..");
        }
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    addUser,
    doLogin
}