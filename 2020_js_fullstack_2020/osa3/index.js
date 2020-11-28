/* eslint-disable no-unused-vars */
//BACKEND
//NPM RUN DEV
//https://safe-hamlet-02496.herokuapp.com/
// käynnistys: node index.js "mongodb-salasana"
// frontendi käynnistys: npm start

require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const { response } = require('express')


app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(bodyParser.json())

// Morgan-token, palauttaa req-bodyn, eli nimen ja numeron oliossa
morgan.token('host', function (req, res) {
  return JSON.stringify(req.body)
})

// MORGAN-loggaus
let conf = ':method :url :status :res[content-length] - :response-time ms :host'
app.use(morgan(conf))



// INFO
// async & await antavat napata arvon countdocumentsista
app.get('/info', async (req, res) => {
  let number = await Person.countDocuments()

  let info = `Phonebook has info ${number} for people`
  let today = new Date()

  let send =
        `
        ${info} <br><br>
        ${today}
        `
  res.send(send)
  console.log('--sending: ', send)
})

// GET PÄÄSIVU
app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})


// GET PERSONS
app.get('/api/persons', (request, response) => {
  Person.find({})
    .then(persons => {
      response.json(persons.map(person => person.toJSON()))
    })
})


// GET PERSON ID
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

// ID:N LUONTI, ei käytössä
const generateId = () => {
  const max = 1000
  const min = 1
  let randomId = Math.floor(Math.random() * (max - min) + min)

  return randomId
}

// POST
app.post('/api/persons', (request, response, next) => {
  const body = request.body

  // Tarkistetaan onko nimi ja numero annettu
  if (!body.name || !body.number) {
    console.log('ERROR: name and/or number missing')
    return response.status(400).json({
      error: 'name and/or number missing'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save()
    .then(savedPerson => {
      response.json(savedPerson.toJSON())

    })
    .catch(error => next(error))


})

// PUT: Numeron päivitys
app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})

// DELETE: Henkilön poisto
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

//VIRHEENKÄSITTELIJÄ
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

// eslint-disable-next-line no-undef
const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})