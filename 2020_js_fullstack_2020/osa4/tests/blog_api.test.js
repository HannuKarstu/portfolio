const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')


const User = require('../models/user')
const blogsRouter = require('../controllers/blogs')

const initialBlogs = [
    {
        title: "ABC of blogging",
        author: "John B. Blogger",
        url: "http://www.johnbblogger.com/notreal/abc",
        likes: 4
    },
    {
        title: "High standards of blogging",
        author: "J. R. R. Bloggien",
        url: "http://www.bloggien.com/notreal/standards",
        likes: 3
    },
    {
        title: "How to make money of blogging",
        author: "Bloggy McBlogface",
        url: "http://www.bloggymcblogface.com/notreal/makemoney",
        likes: 2
    },
    {
        title: "How to get rich by blogging",
        author: "Bloggy McBlogface",
        url: "http://www.bloggymcblogface.com/notreal/getrich",
        likes: 1
    }
]

const postBlog = {
    title: "Game of Bloggers",
    author: "George R. R. Blogen",
    url: "http://www.grrb.com/notreal/gob",
    likes: 15,
}

const noLikesBlog = {
    title: "Game of Bloggers",
    author: "George R. R. Blogen",
    url: "http://www.grrb.com/notreal/gob",
}

const noTitleBlog = {
    author: "George R. R. Blogen",
    likes: 15,
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const findToken = async (userName) => {
    const user = await User.findOne({ username: 'root' })
    return jwt.sign(
        {
            username: user.username,
            id: user.id
        },
        process.env.SECRET)
}






describe('GET tests', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})

        let blogObject = new Blog(initialBlogs[0])
        await blogObject.save()

        blogObject = new Blog(initialBlogs[1])
        await blogObject.save()

        blogObject = new Blog(initialBlogs[2])
        await blogObject.save()

        blogObject = new Blog(initialBlogs[3])
        await blogObject.save()

    })

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })


    test('there are four blogs', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(4)
    })


    test('the first blog is about ABC of blogging', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body[0].title).toBe('ABC of blogging')
    })

    test('the identifier field is called id', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body[0].id).toBeDefined()
    })




})

describe('POST tests', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const user = new User({ username: 'root', password: 'sekret' })
        await user.save()


        await Blog.deleteMany({})

        let blogObject = new Blog(initialBlogs[0])
        await blogObject.save()

        blogObject = new Blog(initialBlogs[1])
        await blogObject.save()

        blogObject = new Blog(initialBlogs[2])
        await blogObject.save()

        blogObject = new Blog(initialBlogs[3])
        await blogObject.save()

    })

    test('request fails with 401 if there is no token with request', async () => {
        token = await findToken("root")

        await api
            .post('/api/blogs')
            .send(postBlog)
            .expect(401)
            .expect('Content-Type', /application\/json/)

    })

    test('blog count rises by one when adding blog', async () => {
        token = await findToken("root")

        await api
            .post('/api/blogs')
            .send(postBlog)
            .set('Authorization', `bearer ${token}`)
            .expect(201)
            .expect('Content-Type', /application\/json/)



        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(initialBlogs.length + 1)
    })

    test('added blog has the correct title', async () => {
        token = await findToken("root")

        await api
            .post('/api/blogs')
            .send(postBlog)
            .set('Authorization', `bearer ${token}`)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        const contents = response.body.map(r => r.title)
        expect(contents).toContain(
            'Game of Bloggers'
        )
    })

    test('field "likes" get value zero if no value given', async () => {
        token = await findToken("root")

        await api
            .post('/api/blogs')
            .send(noLikesBlog)
            .set('Authorization', `bearer ${token}`)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        const contents = response.body.map(r => r.likes)
        const length = contents.length - 1
        expect(contents[length]).toBe(0)
    })

    test('blog without title is not added', async () => {
        token = await findToken("root")
        await api
            .post('/api/blogs')
            .send(noTitleBlog)
            .set('Authorization', `bearer ${token}`)
            .expect(400)

        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(initialBlogs.length)
    })

    test('added blog has the correct user', async () => {
        token = await findToken("root")

        await api
            .post('/api/blogs')
            .send(postBlog)
            .set('Authorization', `bearer ${token}`)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        const contents = response.body.map(r => r.user)
        const root = { username: "root" }
        console.log(contents[4])
        expect(contents[4].toString()).toContain(root.toString())
    })


})

// DELETE TESTS
describe('DELETE tests', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const user = new User({ username: 'root', password: 'sekret' })
        await user.save()

        await Blog.deleteMany({})

        let blogObject = new Blog(initialBlogs[0])
        await blogObject.save()

        blogObject = new Blog(initialBlogs[1])
        await blogObject.save()

        blogObject = new Blog(initialBlogs[2])
        await blogObject.save()

        blogObject = new Blog(initialBlogs[3])
        await blogObject.save()

    })

    test('succeeds with status code 204 if id is valid', async () => {
        token = await findToken("root")

        await Blog.deleteMany({})

        await api
            .post('/api/blogs')
            .send(postBlog)
            .set('Authorization', `bearer ${token}`)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        
        const blogsStart = await blogsInDb()
        const blogToDelete = blogsStart[0]
        console.log("token",token)
        console.log("blogstart",blogsStart)
        console.log("blogstodelete",blogToDelete)

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', `bearer ${token}`)
            .expect(204)


        // Pitää olla yhtä lyhyempi lista kuin ennen poistoa
        const blogsAfterDelete = await blogsInDb()
        expect(blogsAfterDelete.length).toBe(
            blogsStart.length - 1
        )

        // Ei sisällä poistetun blogin otsikkoa
        const contents = blogsAfterDelete.map(r => r.title)
        expect(contents).not.toContain(blogToDelete.title)
    })
})


// UPDATE TESTS
describe('UPDATE tests', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})

        let blogObject = new Blog(initialBlogs[0])
        await blogObject.save()

        blogObject = new Blog(initialBlogs[1])
        await blogObject.save()

        blogObject = new Blog(initialBlogs[2])
        await blogObject.save()

        blogObject = new Blog(initialBlogs[3])
        await blogObject.save()

    })

    test('likes of a blog updated correctly', async () => {
        const blogsStart = await blogsInDb()
        if (blogsStart) {
            const blogToUpdate = blogsStart[0] //likes: 4
            blogToUpdate.likes++ //likes: 5

            await api
                .put(`/api/blogs/${blogToUpdate.id}`)
                .send(blogToUpdate)

            const blogsAfterUpdate = await blogsInDb()
            expect(blogsAfterUpdate[0].likes).toBe(blogToUpdate.likes) //likes: 5
        }
    })
})


afterAll(() => {
    mongoose.connection.close()
})