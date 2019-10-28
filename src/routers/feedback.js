const express = require('express')
const Feedback = require('../models/feedback')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/feedback', auth, async (req, res) => {
    // res.send(req.body)
    const feedback = new Feedback({
        ...req.body,
        owner: req.user._id
    })
    console.log(feedback)
    try {
        await feedback.save()
        res.status(201).send(feedback)
    } catch (e) {
        res.status(501).send(e)
    }
})

router.get('/feedback', async (req, res) => {
    try {
        const feedback = await Feedback.find()
        res.send(feedback)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router