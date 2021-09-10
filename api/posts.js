const express = require('express')
const router = express.Router()
const Posts = require('../models/posts')


async function getPosts(req, res) {
    try {
        const posts = await Posts.find()
        res.send(posts)
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

router.post('/', async (req, res) => {
    const post = new Posts({
        message: req.body.message,
        user_id: req.user.user._id
    })
    try {
        const newPost = await post.save();
        res.status(201).json(newPost)
    } catch (err) {
        console.log(err)
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        })
    }
})

async function editPost(req, res) {
    res.post.message = req.body.message
    try {
        const newPost = await res.post.save();
        res.status(201).json(newPost)
    } catch (err) {
        console.log(err)
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

async function deletePost(req, res) {

    try {
        await res.post.remove()
        res.json({
            success: true,
            message: "Deleted post"
        })
    } catch (err) {
        res.status(500).json({
            success: true,
            message: "Something went wrong"
        })
    }
}

router.get('/', getPosts)
//router.get('/search', searchContacts)
router.patch('/:id', getPost, editPost)
router.delete('/:id', getPost, deletePost)

async function getPost(req, res, next) {
    let post;
    try {
        post = await Posts.findById(req.params.id)
        if (post == null) {
            return res.status(404).json({ message: "cannot find data" })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.post = post
    next()
}

module.exports = router;