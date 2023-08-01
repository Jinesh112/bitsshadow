const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const hbs = require("hbs");
const bcrypt = require("bcryptjs");
const db = require("../src/db/conn");
const emps = require("../src/model/emps");
const router = require("../src/router/emp");

const staticPath = path.join(__dirname, "../public")
const tempPath = path.join(__dirname, "../templets/views");
const partialPath = path.join(__dirname, "../templets/partials");

app.use(express.static(staticPath));
app.set("view engine", "hbs");
app.set("views", tempPath);
hbs.registerPartials(partialPath);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

app.get("/", (req, res) => {
    res.render("index");
})

app.get("/Register", (req, res) => {
    res.render("Register");
})
app.get("/login", (req, res) => {
    res.render("login");
})

app.post("/Register", async (req, res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.cpassword;
        if (password === cpassword) {
            const remp = new emps({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                cpassword: req.body.cpassword
            })

            const reg = await remp.save();
            console.log(reg);
            res.status(201).render("index");
        } else {
            res.send("please enter the correct password")
        }
    } catch (e) {
        res.status(404).send(e);
    }
})


app.post("/login", async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const userName = await emps.findOne({ username: username });

        const isMatch = await bcrypt.compare(password, userName.password)
        if (isMatch) {
            res.status(201).render("index");

        } else {
            res.send("bhidu thik se login kro..............");
        }
        // console.log(`username is ${username} and password is ${password}`);
    } catch (err) {
        res.status(400).send("bhidu thik se login kro..............");
    }
})












app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
})