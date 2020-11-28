import React from 'react'
import ReactDOM from 'react-dom'

  // Kurssin nimi
  //<h1>{course}</h1>
const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}


// Osat ja niiden tehtävämäärät -renderöinti
const Part = (props) => {
  return (
    <>
      {props.part} {props.exercises}
    </>
  )
}

// Part-komponenttien ajo.
const Content = (props) => {
  return (
    <div>
      <Part part={props.parts[0].name} exercises={props.parts[0].exercises} /> <br></br>
      <Part part={props.parts[1].name} exercises={props.parts[1].exercises} /> <br></br>
      <Part part={props.parts[2].name} exercises={props.parts[2].exercises} /> <br></br>
    </div>
  )
  
}

// Tehtävien yhteismäärä
// <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
const Total = (props) => {
  return (
    <p1>
      Yhteensä: {props.parts[0].exercises+props.parts[1].exercises+props.parts[2].exercises}
    </p1>
  )
  
}

  //Pääkomponentti ja määrittelyt
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))