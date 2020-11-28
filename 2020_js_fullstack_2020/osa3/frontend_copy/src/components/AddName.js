import React from 'react'

const AddName = (props) => {
    return (
      <form onSubmit={props.addName}>
        name:
        <input
          value={props.newName}
          onChange={props.handleNameChange}
        />
        <br></br>
              phone:
        <input
          value={props.newNumber}
          onChange={props.handleNumberChange}
        />
        <br></br>
        <button type="submit">add</button>
      </form>
    )
  }

  export default AddName