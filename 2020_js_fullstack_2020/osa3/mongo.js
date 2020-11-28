/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const mongoose = require('mongoose')

let add = false
let search = false

if (process.argv.length === 5) {
  add = true
} else if (process.argv.length === 3) {
  search = true
} else {
  console.log('give either password or password, name and number as arguments')
  process.exit(1)
}

//STARTUP: node mongo.js PASSWORD Anna 040-1234567
const password = process.argv[2]
const newName = process.argv[3]
const newNumber = process.argv[4]


const url =
    `mongodb+srv://fullstack:${password}@cluster0-joj9n.mongodb.net/phonebook?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: String
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: newName,
  number: newNumber,
})

if (add === true) {
  person.save().then(response => {
    console.log(`added ${newName} number ${newNumber} to phonebook.`)
    mongoose.connection.close()
  })
}

if (search === true) {
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}


