import { useState } from 'react'

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max)
}

const Button = (props) => { 
  const { onClick, text } = props
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}



const FavoriteAphorism = (props) => {
  const { aphorisms, votes, indexOfMaxVotes } = props

  if (votes[indexOfMaxVotes] == 0) {
    return (
      <div>
        <h1>Users' Favorite</h1>
        <span>No votes have been cast</span>
      </div>
    )
  }

  return (
    <div>
      <h1>Users' Favorite</h1>
      <Aphorism aphorisms={aphorisms} votes={votes} selected={indexOfMaxVotes}/>
    </div>
  )
}

const Aphorism = (props) => {
  const { aphorisms, votes, selected } = props
        return (
        <div>
          <div>{aphorisms[selected]}</div>
                <p></p>
                <Votes votes={votes} selected={selected} />
        </div>
      )
}

const Votes = (props) => {
  const { votes, selected } = props
  if (votes[selected] == 1) {
    return <div>This aphorism has {votes[selected]} vote.</div>
  }
  return <div>This aphorism has {votes[selected]} votes.</div>
}



const App = () => {

  const aphorisms = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const numAphorisms = aphorisms.length;
  const initialVotes = Array(numAphorisms).fill(0)

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(initialVotes)
  const [indexOfMaxVotes, setIndexofMaxVotes] = useState(0)


  const getIndexOfMax = (arr) => {
    let maxIndex = 0;
    for (let i = 0; i < arr.length; i++){
      if (arr[i] > arr[indexOfMaxVotes]) {
        maxIndex = i
      }
  }
  return maxIndex
}

  const handleRandomizerClick = () => {
    const newSelection = getRandomInt(numAphorisms)
    setSelected(newSelection)
  }

  const handleVoterClick = () => {
    const votesCopy = [ ...votes ]
    votesCopy[selected] += 1
    setVotes(votesCopy)

    const newMaxVotes = getIndexOfMax(votesCopy)
    console.log("New max votes: ", newMaxVotes)
    setIndexofMaxVotes(newMaxVotes)
  }

  return (
    <div>
      <h1>Aphorism of the Day</h1>
      <Button onClick={handleRandomizerClick} text="Random Aphorism"/>
      <Button onClick={handleVoterClick} text="Vote for this aphorism"/>
      <p></p>
      <Aphorism aphorisms={aphorisms} votes={votes} selected={selected}/>
      
      <FavoriteAphorism 
        aphorisms={aphorisms} 
        votes={votes} 
        indexOfMaxVotes={indexOfMaxVotes}
      />

    </div>
  )
}

export default App