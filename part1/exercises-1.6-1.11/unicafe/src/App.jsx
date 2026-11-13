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

const DisplayRatio = (props) => {

  if (props.total == 0) {
    return <div>{props.title}: N/A</div>
  }

  return <div>{props.title}: {props.score / props.total}</div>
}

const DisplayPercentage = (props) => {

  if (props.total == 0) {
    return <div>{props.title}: N/A</div>
  }

  return <div>{props.title}: {props.score / props.total * 100}%</div>
}

const Statistics = (props) => {

  if (props.total == 0) {
    return (
    <div>
      <Header title="Statistics"/>
      <p>No feedback given</p>
      </div>
  )
  }

  return (
    <div>
      <Header title="Statistics"/>
      <Display title="Good" count={props.good}/>
      <Display title="Neutral" count={props.neutral}/>
      <Display title="Bad" count={props.bad}/>
      <p></p>
      <Display title="Total" count={props.total}/>
      <DisplayRatio title="Average" score={props.score} total={props.total}/>
      <DisplayPercentage title="Percent Positive" score={props.good} total={props.total}/>
    </div>
  )
    
}




const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  // the feedback values are: good 1, neutral 0, bad -1
  const [score, setScore] = useState(0)

  const goodHandler = () => {
    const updatedGood = good + 1
    setGood(updatedGood)

    const updatedTotal = total + 1
    setTotal(updatedTotal)

    const updatedScore = score + 1
    setScore(updatedScore)
    
  }

  const badHandler = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)

    const updatedTotal = total + 1
    setTotal(updatedTotal)

    const updatedScore = score - 1
    setScore(updatedScore)

  }

  const neutralHandler = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)

    const updatedTotal = total + 1
    setTotal(updatedTotal)
  }

  return (
    <div>
      <Header title="Give Feedback"/>
      <Button onClick={goodHandler} text={"Good"}/>
      <Button onClick={neutralHandler} text={"Neutral"}/>
      <Button onClick={badHandler} text={"Bad"}/>

      <Statistics good={good} neutral={neutral} bad={bad} total={total} score={score}/>

    </div>
  )
}

export default App