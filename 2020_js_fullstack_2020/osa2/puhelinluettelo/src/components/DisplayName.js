import React from 'react'

const DisplayName = (props) => {
    return (
        <>
        {props.person.name} {props.person.number} 
        <button onClick={(()=> 
            props.deletePerson(props.person))}> 
            delete </button>
            <br></br></>    
    )
}

export default DisplayName