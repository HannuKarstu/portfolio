// App.js, App.css, App.test.js, logo.svg ja serviceWorker.js voi poistaa


import React, { useState } from 'react'
import ReactDOM from 'react-dom'

// Nappulan näyttö
const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

// Anekdootin piirto ruudulle
const Display = (props) => (
<>{props.text}</>
)



// APP
const App = (props) => {
  // Pistetaulukko
  const points = [0,0,0,0,0,0]
  
  // Valittu anekdootti
  const [selected, setSelected] = useState(0)

  // Anekdoottien äänimäärät
  const [vote, setVote] = useState(points)

  // Eniten ääniä saanut anekdootti
  const [best, setBest] = useState(0)

  

  // Anekdootin vaihto toiseen randomilla
  const setAnecdote = oldNumber => {
    while (true) {
      let randomi = Math.floor(Math.random() * 6)
      if (oldNumber != randomi) {
        setSelected(randomi)
        break
      } 
    }
  }

  // Äänen lisäys anekdootille
  const voteAnecdote = selected => {
    //Määritetään kopio vote-taulukosta, joka taas on points-taulukko
    const copy = [...vote]

    //Kasvatetaan valittua kohtaa yhdellä
    copy[selected] += 1
    
    // Asetetaan copy-taulukko ääntenlaskuun.
    setVote(copy)
    
    // Määritetään eniten ääniä saanut anekdootti
      // Suurin luku taulukosta
    let largest = Math.max.apply(null, copy)

    // Käydään läpi taulukko ja etsitään missä kohtaa suurin luku on
      // Kirjataan indeksi setBestiin
    for (var i = 0; i < 6; i++) {
      if (copy[i] == largest) {
        setBest(i)
        break
      }
    }
  }


  return (
    <div>

      <h1>Anecdote of the day</h1>

      {/* Seuraava anekdootti */}
      <Button handleClick={() => setAnecdote(selected)} text="next anecdote" />

       {/* Seuraava anekdootti */}
      <Button handleClick={() => voteAnecdote(selected)} text="vote anecdote" />

      <br></br>
      <br></br>
      <br></br>

      {/* Anekdootin näyttö listalta */}
      <Display text={props.anecdotes[selected]} />
      
      
      <br></br>
      <br></br>

      <div>
        Selected anecdote number {selected} has <Display text={vote[selected]}/> votes <br></br>
      </div>

      <h1>Anecdote with most votes</h1>
      <div>
      <Display text={props.anecdotes[best]} />
      <br></br>
      <br></br> It has <Display text={vote[best]}/> votes <br></br>
      </div>



    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)