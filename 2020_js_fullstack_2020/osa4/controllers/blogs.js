const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const _ = require('underscore')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const blog = require('../models/blog')

//GET
blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs.map(blog => blog.toJSON()))
})


//POST
blogsRouter.post('/', async (request, response) => {
    const body = request.body

    if (!body.title || !body.url) {
        response.status(400).end()
    } else {

        if (body.likes === undefined) {
            body.likes = 0
        }

        const decodedToken = await jwt.verify(request.token, process.env.SECRET)

        if (!request.token || !decodedToken.id) {
            return response.status(401).json({
                error: 'token missing or invalid'
            })
        }
        
        const user = await User.findById(decodedToken.id)

        const blog = new Blog(
            {
                title: body.title,
                author: body.author,
                url: body.url,
                likes: body.likes,
                user: user.id
            }
        )

        const savedBlog = await blog.save()

        user.blogs = await user.blogs.concat(savedBlog._id)
        await user.save()

        response.status(201).json(savedBlog)

    }

})

//DELETE
blogsRouter.delete('/:id', async (request, response) => {
    const decodedToken = await jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
        return response.status(401).json({
            error: 'token missing or invalid'
        })
    }
    const user = await User.findById(decodedToken.id)

    const blogToDelete = await Blog.findById(request.params.id)

    if (blogToDelete && user) {
        if (blogToDelete.user.toString() === user.id.toString()) {
            await Blog.findByIdAndRemove(request.params.id)
            response.status(204).end()
        } else {
            console.log("blogToDelete.user", blogToDelete.user)
            console.log("user.id", user.id)
            return response.status(401).json({
                error: 'the blog is not created by this user'
            })
        }
    } else {
        response.status(400).end()
    }
})


//UPDATE
blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })

    if (updatedBlog) {
        response.json(updatedBlog.toJSON())
    } else {
        response.status(404).end()
    }
})

module.exports = blogsRouter