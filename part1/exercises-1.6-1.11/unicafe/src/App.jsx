import { useState } from 'react'

const Header = (props) => {
  return (
    <h1>{props.title}</h1>
  )
}

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>
}

const Display = (props) => {
  return (
    <div>{props.title}: {props.count}</div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodHandler = () => setGood(good + 1)
  const badHandler = () => setBad(bad + 1)
  const neutralHandler = () => setNeutral(neutral + 1)


  return (
    <div>
      <Header title="Give Feedback"/>
      <Button onClick={goodHandler} text={"good"}/>
      <Button onClick={neutralHandler} text={"neutral"}/>
      <Button onClick={badHandler} text={"bad"}/>

      <Header title="Statistics"/>

      <Display title="Good" count={good}/>
      <Display title="Neutral" count={neutral}/>
      <Display title="Bad" count={bad}/>

    </div>
  )
}

export default App