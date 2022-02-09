import React from 'react'

const Header = ({name}) => {
    return (
      <h2>{name}</h2>
    )
  }
  
  const Total = ({ parts }) => {
    var total = parts.reduce(function(sum, part) {
      return sum + part.exercises
    }, 0)
    return(
      <p>total of {total} exercises</p>
    ) 
  }
  
  const Part = ({part}) => {
    return (
      <li>
        {part.name} {part.exercises}
      </li>  
    )
  }
  
  const Content = ({parts}) => {
    return (
      <div>
        <ul>
          {parts.map(part =>
              <Part key={part.id} part={part} />
            )}
        </ul>
      </div>
    )
  }
  

const Course = ({chapter}) => {
    return (
      <div>
        <Header name={chapter.name} />
        <Content parts={chapter.parts} />
        <Total parts={chapter.parts} />
      </div>
    )
  }

export default Course