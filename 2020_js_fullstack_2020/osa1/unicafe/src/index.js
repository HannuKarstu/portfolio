// App.js, App.css, App.test.js, logo.svg ja serviceWorker.js voi poistaa
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

// Tulostusfunktio
// const Display = props => <div>{props.name} {props.value}</div>
const Display = props => 
<tr>
  <td>{props.name}</td> 
  <td>{props.value}</td>
</tr>


// Nappulan näyttö
const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

// Tilastojen tulostus
const StatisticsLine = (props) => {
  return (
    // Lähetetään Displaylle.
    <Display value={props.value} name={props.text} />
  )
}


// Tilastot. Ka:n laskeminen, positiiviset ja yhteensä.
const Statistics = (props) => {
  
  // Otetaan props.palaute-taulukosta good, neutral ja bad
  let good = props.palaute[0]
  let neutral = props.palaute[1]
  let bad = props.palaute[2]

  // Yhteenlasku
  let all = good + bad + neutral

  // Keskiarvo, good +1, bad -1, neutral 0
  let average = (good * 1 + bad * -1) / all 

  // Positiivisten määrä
  let positive = (good / all * 100)
  console.log(good)

  // Tulostus
  if (all > 0) { 
    return (
      <div>
        <h1>Statistics</h1>
        <table>
          <tbody>
            <StatisticsLine text="good" value={good}/>
            <StatisticsLine text="neutral" value={neutral}/>
            <StatisticsLine text="bad" value={bad}/>

            <StatisticsLine text="all" value={all}/>
            <StatisticsLine text="average" value={average}/>
            <StatisticsLine text="positive" value={positive}/>
          </tbody>
        </table>
      </div>
    )
  } else {
    return (
      <div>
        <h1>Statistics</h1>
        No feedback given.
      </div>
    )
  }
  
}


const App = props => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // Good lisäys
  const setToGood = newValue => {
    setGood(newValue)
  }

  // Neutral lisäys
  const setToNeutral = newValue => {
    setNeutral(newValue)
  }

  // Bad lisäys
  const setToBad = newValue => {
    setBad(newValue)
  }

  // Laitetaan palautteet taulukkoon
  let palaute = [good,neutral,bad]


  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={() => setToGood(good + 1)} text="good" />
      <Button handleClick={() => setToNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setToBad(bad + 1)} text="bad" />

      {/* Lähetetään palautteet Statisticsille */}
      <Statistics palaute={palaute} />
     
      

    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)