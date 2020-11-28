import React from 'react'
  
  // Kurssin nimi
  const Header = (props) => {
    return (
      <>
        <h2>{props.course}</h2>
      </>
    )
  }
  
  
  // Osat ja niiden tehtävämäärät -renderöinti
  // Otetaan vastaan part-olio
  // Palautetaan siitä id, name ja exercises -kentät
  const Part = ({part}) => {
    
    return (
      <>
        {part.name} {part.exercises} <br></br>
      </>
    )
  }
  
  // Content
  // Otetaan vastaan parts-taulukko
  // Mapataan se Part-komponentille
  // Ja lähetetään Totalille
  const Content = (props) => {
    const parts = props.parts
  
    return (
      <>
        {parts.map(part =>
          <Part key={part.id} part={part} />
        )}
        <Total parts={parts} />  
      </>
    ) 
  }
  
  
  // Total
  // Otetaan vastaan parts-taulukko (sis. olioita)
  // Lasketaan yhteen 
  const Total = (props) => {
    const parts = props.parts
  
    // reduce-funktio laskee yhteen oliotaulukon exercises-luvut
    let initialValue = 0
    let sum = parts.reduce(function (accumulator, currentValue) {
      return accumulator + currentValue.exercises
    }, initialValue)
  
    return (
      <h3>
        Total exercises: {sum}
      </h3>
    )
    
  }
  
  
  // Kurssi
  // Otetaan vastaan course-olio
  // Lähetetään Headerille name
  // Lähetään Contentille parts-taulukko (sis. olioita)
  const Course = (props) => {
    const course = props.course
    return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
      </div>     
    )
    
  }


export default Course