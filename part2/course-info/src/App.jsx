import { useState } from 'react'

const Header = (props) => <h1>{props.name}</h1>

const Content = ({parts}) => {
  return (
    <div>
    <ul>
        {parts.map((part) => (
            <Part key={part.id} part={part} />
        
        ))}
      </ul>
  </div>
)
}

const Part = (props) => (
  <p>
    <li>{props.part.name} {props.part.exercises}</li>
  </p>
)

const Total = ({parts}) => {
  const initialValue = 0;
  const total = parts.reduce(
    (accumulator, currentValue) => 
      accumulator + currentValue.exercises, initialValue
  )
  return (
    <div>
      <strong>Total number of exercises: {total}</strong>
    </div>
  )
}

const Course = ({course}) => {
  const parts = course.parts
  
  return (
    <div>
      <Header name={course.name}/>
      <Content parts={parts}/>
      <Total parts={parts}/>
    </div>
  )
  
}



const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    courses.map(course => <Course key={course.id} course={course}/>)
  )
}

export default App