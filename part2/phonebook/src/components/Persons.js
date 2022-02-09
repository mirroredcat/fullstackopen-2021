import React from "react"
import EntryWithDeleteButton from "./EntryWithDeleteButton"

const Persons = ({persons, filter, handleDelete}) => {
  
  if (filter.length === 0) {
    return (
      <div>
      <ul> 
        {persons.map(person => 
          <EntryWithDeleteButton key={person.id} person={person} handleDelete={()=> handleDelete(person.id)} /> 
          )}
      </ul>
    </div>
    )
  } else {
    var filtered = persons.filter(function(person) {
      return person.name.toLowerCase().includes(filter.toLowerCase())
    })
    if (filtered.length === 0) {
      return (
        <div>
          no such name
        </div>
      )
    }
    return (
      <div>
        <ul> 
        {filtered.map(person => 
          <EntryWithDeleteButton key={person.id} person={person} handleDelete={()=> handleDelete(person.id)} /> 
          )}
      </ul>
      </div>
    )
  }
}

export default Persons