import React, { useState, useEffect } from 'react'

import DisplayPersons from './components/DisplayPersons'
import AddName from './components/AddName'
import DisplayFilter from './components/DisplayFilter'
import personService from './services/persons'


//npm start
//npm run server
//localhost:3001/persons

const App = (props) => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [Message, setMessage] = useState({})


  // Haetaan nimet serveriltä
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  // Nollaa ilmoituksen
  const resetMessage = () => {
    setTimeout(() => {
      setMessage({
        content: null,
        messagetype: null
      })
    }, 5000)
  }

  // Ilmoitukset
  const Notification = (props) => {
    let message = props.message.content
    let messagetype = props.message.messagetype

    if (messagetype === 'notification') {
      return (
        <div className="notification">
          {message}
        </div>
      )
    }

    if (messagetype === 'error') {
      return (
        <div className="error">
          {message}
        </div>
      )
    }

    return null


  }

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }

    // Tarkistetaan löytyykö nimi listalta
    if (persons.some(el => el.name === newName) === false) {

      // Lähetetään uusi nimi serverille
      personService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setMessage({
            content: `${newName} added to phonebook`,
            messagetype: 'notification'
          })
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setMessage({
            content: error.response.data.error,
            messagetype: 'error'
          })
        })

      resetMessage()
      
    } else {
      let confirmUpdate = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (confirmUpdate === true) {

        // Määritetään missä päivitettävä nimi on
        let index = persons.map(function (e) { return e.name; }).indexOf(newName);
        let personid = persons[index].id

        // Päivitetään numero id:n perusteella
        personService
          .update(personid, nameObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== personid ? person : returnedPerson))
            setMessage({
              content: `${newName}'s number updated`,
              messagetype: 'notification'
            })
          })
          .catch(error => {
            setMessage({
              content: `Person '${newName}' was already removed from server`,
              messagetype: 'error'
            })
          })

        resetMessage()
        setNewName('')
        setNewNumber('')
      }
    }
  }

  const deletePerson = (person) => {
    let confirmDelete = window.confirm(`delete ${person.name} ?`)
    if (confirmDelete === true) {

      // Määritetään uusi lista ilman poistettavaa nimeä
      const deleted = persons.filter((item) => item.id !== person.id);

      // Lähetetään poistokäsky serverille
      personService
        .remove(person.id)
        .then(x => {
          setMessage({
            content: `${person.name} deleted from phonebook`,
            messagetype: 'notification'
          })
        })
        .catch(error => {
          setMessage({
            content: `Person '${person.name}' was already removed from server`,
            messagetype: 'error'
          })
        })

      setPersons(deleted)
      resetMessage()

    }
  }

  // Filtteröidään henkilöt
  const filtered = persons.filter(item => item.name.toLowerCase().includes(newFilter.toLowerCase()))



  return (
    <div>

      <h2>Phonebook</h2>
      <Notification message={Message} />

      <DisplayFilter
        handleFilterChange={handleFilterChange}
      />

      <h3>add a new</h3>
      <AddName
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <DisplayPersons
        persons={filtered}
        deletePerson={deletePerson}
      />
    </div>
  )
}

export default App