const mongoose = require('mongoose');


function connect() {
    mongoose.connect('mongodb://127.0.0.1:27017/IoT', () => {
        console.log("Mongo is connected");
    });
};

module.exports = connect;



