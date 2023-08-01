const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const empSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        // unique: true
    },

    email: {
        type: String,
        required: true,
        // unique: true,
        // validate(value) {
        //     if (!validator.isEmail(value)) {
        //         throw new Error("Invalid Email")
        //     }
        // }
    },
    password: { type: String, required: true },
    cpassword: { type: String, required: true }
});


empSchema.pre("save", async function (next) {
    if (this.isModified("password")) {

        // console.log(`the current password is ${this.password}`);
        this.password = await bcrypt.hash(this.password, 10);
        // console.log(`the current password is ${this.password}`);
        this.cpassword = await bcrypt.hash(this.password, 10);
    }
    next();
})


const emps = new mongoose.model("emps", empSchema);
module.exports = emps;