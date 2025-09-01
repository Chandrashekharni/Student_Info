const mongoose = require('mongoose');

async function connect(){
    await mongoose.connect('mongodb://localhost:27017/ejsstudentproject');
    console.log('Database is connected...');
    try {    
    } catch (error) {
        console.log(error);   
    }
}
module.exports = connect;