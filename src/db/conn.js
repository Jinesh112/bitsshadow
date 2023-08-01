const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/emp-api")
    .then(() => {
        console.log("connecting to the database......");
    }).catch((e) => {
        console.log('Error connecting to database');
    })


