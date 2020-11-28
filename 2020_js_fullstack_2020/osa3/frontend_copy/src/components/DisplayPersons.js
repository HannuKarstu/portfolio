import React from 'react'
import DisplayName from './DisplayName'

const DisplayPersons = (props) => {
    // Filtteröidään persons-taulukkoa
    // muutetaan pieniksi kirjaimiksi taulukko ja filtteri
    let filtered = props.persons
    
    // Palautetaan filtteröity tulos
    return (
      filtered.map(person =>
        <DisplayName key={filtered.name} person={person} deletePerson={props.deletePerson} />
      )
    )
}

export default DisplayPersons