import { useState } from 'react'

const Header = (props) => {
  return (
    <h1>{props.title}</h1>
  )
}

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>
}

const StatisticLine = (props) => {
  return (
    <tr>
      <th>{props.title}</th>
      <td>{props.value}</td>
    </tr>
  )
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

  const average = (props.score / props.total).toFixed(2)
  const percentPositive = (props.good / props.total * 100).toFixed(1)
  const percentPositiveString = `${percentPositive}%`

  return (
    <div>
      <Header title="Statistics"/>
      

      <table>
        <tbody>
          <StatisticLine title="Good" value={props.good}/>
          <StatisticLine title="Neutral" value={props.neutral}/>
          <StatisticLine title="Bad" value={props.bad}/>
          <StatisticLine title="Total" value={props.total}/>
          <StatisticLine title="Average" value={average}/>
          <StatisticLine title="Percent Positive" value={percentPositiveString}/>
        </tbody>
      </table>

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