const express = require('express')
const Post = require('../models/post')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/post', auth, async (req, res) => {
    // res.send(req.user)
    const post = new Post({
        ...req.body,
        owner: req.user._id
    })
    try {
        await post.save()
        res.status(201).send(post)
    } catch (e) {
        res.status(501).send(e)
    }
})

//get all posts
router.get('/allposts', auth, async (req, res) => {
    try {
        const post = await Post.find()
        res.send(post)
    } catch (e) {
        res.status(500).send(e)
    }
})

//get all user post ex. /posts?status=draft
//pagination : limit skip ex. /posts?limit=10&skip=10
//sorting: ex. /tasks?sortBy=createdAt:asc or /task?sortBy=createdAt:desc
router.get('/posts', auth, async (req, res) => {
    const match = {}
    const sort = {}

    if (req.query.status === "draft") {
        match.status = req.query.status
    } else if (req.query.status === "published") {
        match.status = req.query.status
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 :  1 ////1 = ascending -1 = descending
        
    }

    try {
        await req.user.populate({
            path: "post", //post from users model virtual field
            match, //equal to match: match //because it has the same value
            options: { //pagination
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort: sort 
            }
        }).execPopulate()
        res.send(req.user.post)
    } catch (e) {
        res.status(500).send(e)
    }
})

//get post details 
router.get('/post/:id', auth,  async (req, res) => {
    const _id = req.params.id

    try {
        const post = await Post.findOne({ _id, owner: req.user._id })
        if( !post ) {
            return res.status(404).send()
        }
        res.send(post)
    } catch (e) {
        res.status(500).send(e)
    }
})

//update post
router.patch('/post/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'status', 'content']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {      
        const post = await Post.findOne({ _id: req.params.id, owner: req.user._id }) 
        // const post = await Post.findById({ _id, owner: req.user._id })

        if ( !post ) {
            return res.status(404).send()
        }

        updates.forEach((update) => post[update] = req.body[update])
        await post.save()
        res.send(post)
    } catch (e) {
        res.status(400).send(e)
    }
})

//delete post
router.delete('/post/:id', auth, async (req, res) => {
    try {
        const post = await Post.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
        if ( !post ) {
            return res.status(404).send()
        }
        const msg = "post deleted"
        res.send({post, msg})
    } catch (e) {
        res.send(e)
    }
})

module.exports = router