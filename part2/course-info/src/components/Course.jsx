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

export default Course