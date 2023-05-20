const router = require('express').Router();
const Admin = require("../models/admin");
const Election =require("../models/election")

router.get("/getcontract/:id", async (req, res) => {
    try {
        Admin.findById(req.params.id).then(result => {

            if (result.adminContract == "") {
                res.send(false)
            }
            else {
                res.json(result.adminContract)
            }
        })
    }
    catch (err) {
        res.send(err)
        console.log(err)
    }
})
router.put("/postcontract", async (req, res) => {
    try {
        console.log(req.body)
        const data = await Admin.findById(req.body.id);
        await data.updateOne({ $set: { adminContract: req.body.Acontract,proposal:req.body.proposal } }).then(result => {
            const elect = new Election({
                adminName: data.adminName,
                proposal: req.body.proposal,
                contractAddress:req.body.Acontract
            })
            elect.save();
            res.send(true)
        })
        

    }
    catch (err) {
        res.send(err)
    }
})
router.get("/getallcontract/:id", async (req, res) => {
    console.log(req.params)
    try {
        await Election.findById(req.params.id).then(result=>
            {
                res.json(result);
            })
    }
    catch (err) {
        res.send(err)
        console.log(err)
    }
})


module.exports = router