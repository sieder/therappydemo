const express = require('express')
const Profile = require('../models/profile')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/profiles', auth, async (req, res) => {
    // res.send(req.body)
    const profile = new Profile({
        ...req.body,
        owner: req.user._id
    })
    console.log(profile)
    try {
        await profile.save()
        res.status(201).send(profile)
    } catch (e) {
        res.status(501).send(e)
    }
})

router.get('/profiles', async (req, res) => {
    try {
        const profile = await Profile.find()
        res.send(profile)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/profile/me', auth, async (req, res) => {
    try {
        console.log(req.user.profile)
        await req.user.populate('profile').execPopulate()
        res.send(req.user.profile)
    } catch (e) {
        res.status(500).send(e)
    }
    
})

router.get('/profile/:id', auth,  async (req, res) => {
    const _id = req.params.id

    try {

        const profile = await Profile.findOne({ _id, owner: req.user._id })
        if( !profile ) {
            return res.status(404).send()
        }
        res.send(profile)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.patch('/profile/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['firstName', 'lastName', 'aboutMe']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {       
        const profile = await Profile.findOne({ _id: req.params.id, owner: req.user._id })
        // const profile = await Profile.findById(req.params.id)

        if ( !profile ) {
            return res.status(404).send()
        }

        updates.forEach((update) => profile[update] = req.body[update])
        await profile.save()
        res.send(profile)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/profile/:id', async (req, res) => {
    try {
        const profile = await Profile.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
        if ( !profile ) {
            return res.status(404).send()
        }
        const msg = "profile deleted"
        res.send({profile, msg})
    } catch (e) {
        res.send(e)
    }
})

module.exports = router