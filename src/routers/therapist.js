const express = require('express')
const Therapist = require('../models/therapist')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/therapist', async (req, res) => {
    
    try {
        const therapist = new Therapist(req.body)
        await therapist.save()    
        res.status(201).send(therapist)
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

router.get('/therapist', auth, async (req, res) => {
    try {
        const therapist = await Therapist.find({})
        res.send(therapist)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/therapist/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const therapist = await Therapist.findById(_id)
        if (!therapist) {
            return res.status(404).send()
        }
        res.send(therapist)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router