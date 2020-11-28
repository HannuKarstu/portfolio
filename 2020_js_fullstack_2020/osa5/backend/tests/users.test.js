const bcrypt = require('bcrypt')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')


const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

describe('when there is initially one user at db', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const user = new User({ username: 'root', password: 'sekret' })
        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await usersInDb()
        const newUser = {
            username: 'hanski',
            name: 'Hannele Testaaja',
            password: 'password1234',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })


    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` to be unique')

        const usersAtEnd = await usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })


    test('creation fails if username < 3 characters', async () => {
        const usersAtStart = await usersInDb()

        const newUser = {
            username: 'ro',
            name: 'Superuser',
            password: 'salainen',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('is shorter than the minimum')

        const usersAtEnd = await usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })


    test('creation fails if no username given', async () => {
        const usersAtStart = await usersInDb()

        const newUser = {
            name: 'Superuser',
            password: 'salainen',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('is required')

        const usersAtEnd = await usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })

    test('creation fails if no password given', async () => {
        const usersAtStart = await usersInDb()

        const newUser = {
            username: 'Heppu',
            name: 'Heppuli',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('no password given')

        const usersAtEnd = await usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })

    test('creation fails if password < 3 character', async () => {
        const usersAtStart = await usersInDb()

        const newUser = {
            username: 'Heppu',
            name: 'Heppuli',
            password: 'aa'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('too short password given')

        const usersAtEnd = await usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })

    afterAll(() => {
        mongoose.connection.close()
    })

})
