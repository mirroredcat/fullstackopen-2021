import React, { useState, useEffect } from 'react'

import Persons from "./components/Persons"
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'

import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)

// import from database
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

// handles the input from the name form
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  //handles the input from the phone form
  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const handleNewFilter = (event) => {
    setNewFilter(event.target.value)
  }
 
  //adds new names to the persons array
  const addPerson = event => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newPhone
    }
    
    if (persons.map((x) => x.name).includes(newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(x => x.name === newName)
        const changedPerson = {...person, number: newPhone}

        personService
          .update(person.id, changedPerson)
          .then( returnedPerson => {
            setPersons(persons.map(person => person.name !== newName ? person : returnedPerson))
          })
          .catch(error => {
            setMessage({
              type: 'error',
              text: `Information of ${person.name} has already been removed from server`
            })
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            setPersons(persons.filter(n => n.id !== person.id))
          })
      }
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
    }
    setNewName('')
    setNewPhone('')
    setMessage({
      type: 'success',
      text: `Added ${personObject.name}`
    })
    setTimeout(()=> {setMessage(null)}, 5000)
  }

  const deletePersonWith = id => {
    const person = persons.find(n => n.id === id)
    
    if (window.confirm(`Delete ${person.name}`)) {
      personService
        .deleteName(id)
        .then( () => {
          setPersons(persons.filter(person => person.id !== id ))
        })
      setMessage({
        type: 'success',
        text: `Deleted ${person.name}`
      })
      setTimeout(()=> {setMessage(null)}, 5000)
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} />
      <Filter value={newFilter} onChange={handleNewFilter} />
      
      <h3>add a new</h3>

      <PersonForm onSubmit={addPerson} value1={newName} onChange1={handleNameChange} 
                  value2={newPhone} onChange2={handlePhoneChange} />
      
      <h3>Numbers</h3>
      
      <Persons persons={persons} filter={newFilter} handleDelete={deletePersonWith} />
    </div>
  )
}

export default App