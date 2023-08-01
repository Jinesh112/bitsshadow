const express = require("express");
const router = new express.Router();
const emps = require("../model/emps");
router.post("/emps", async (req, res) => {
    try {
        const ep = new emps(req.body);
        const empData = await ep.save();
        console.log(empData);
        res.status(202).send(empData);
    } catch (err) {
        res.status(400).send(err);
    }
})
router.get("/emps", async (req, res) => {
    try {
        const edata = await emps.find();
        res.send(edata);
    } catch (e) {
        return res.status(404).send(e);
    }
})
router.get("/emps/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const edata = await emps.findById(_id);
        if (!edata) {
            return res.status(404).send();
        } else {
            res.send(edata);
            console.log(edata);
        }
    } catch (e) {
        return res.status(404).send(e);
    }
})

router.delete("/emps/:id", async (req, res) => {
    try {

        const emdata = await emps.findByIdAndDelete(req.params.id);
        if (!req.params.id) {
            return res.status(404).send();
        }
        res.send(emdata);
        console.log(emdata);

    } catch (e) {
        return res.status(404).send(e);
    }
})

router.patch("/emps/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        console.log(_id);
        const update = await emps.findByIdAndUpdate(_id, req.body);
        res.send(update);
        console.log(update);
    } catch (e) {
        res.status(404).send(e);
    }
})

module.exports = router;