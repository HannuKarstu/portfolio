import React, { useState, useImperativeHandle } from 'react'
import { Button } from 'react-bootstrap'


const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <br></br>
      <div style={hideWhenVisible}>
        <Button variant="outline-info" id="addblog" onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button variant="outline-danger" onClick={toggleVisibility}>cancel</Button>
      </div>
      <br></br>
    </div>
  )
})

Togglable.displayName = 'Togglable'


export default Togglable