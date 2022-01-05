import React, { useState } from 'react'

const Button = ({ onClick, text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const StatisticLine = ({text, value, symbol=""}) => {
  return (
    <tr>
      <td>{text}:</td> 
      <td>{Math.round(value * 10)/10} {symbol}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
    

    if ((good + bad + neutral) === 0) {
      return(
        <div>
          No feedback given.
        </div>
      )
    }
    return(
      <div>
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral}/>
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={good + bad + neutral} />
            <StatisticLine text="average" value={(good-bad)/(good + bad + neutral)} />
            <StatisticLine text="positive" value={(good * 100)/(good + bad + neutral)} symbol="%" />
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

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  return (
    <div>
      <h2>give feedback</h2>
      <Button onClick={increaseGood} text="good" />
      <Button onClick={increaseNeutral} text="neutral" />
      <Button onClick={increaseBad} text="bad" />

      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />

    </div>
  )
}

export default App