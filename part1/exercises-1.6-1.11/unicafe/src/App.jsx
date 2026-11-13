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

      <Header title="Statistics"/>

      <Display title="Good" count={good}/>
      <Display title="Neutral" count={neutral}/>
      <Display title="Bad" count={bad}/>
      <p></p>
      <Display title="Total" count={total}/>
      <DisplayRatio title="Average" score={score} total={total}/>
      <DisplayPercentage title="Percent Positive" score={good} total={total}/>

    </div>
  )
}

export default App