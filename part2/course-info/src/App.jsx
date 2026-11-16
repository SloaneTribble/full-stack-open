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

const Total = (props) => {
  const initialValue = 0;
  const total = props.parts.reduce(
    (accumulator, currentValue) => 
      accumulator + currentValue.exercises, initialValue
  )
  return (
    <div>
      <strong>Total number of exercises: {total}</strong>
    </div>
  )
}

const Course = (props) => {
  const parts = props.course.parts
  
  return (
    <div>
      <Header name={props.course.name}/>
      <Content parts={parts}/>
      <Total parts={parts}/>
    </div>
  )
  
}



const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
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
      }
    ]
  }

  return <Course course={course} />
}

export default App