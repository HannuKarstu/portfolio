import React, { useState, useImperativeHandle } from 'react'
import { Button } from 'react-bootstrap'


const TogglableBlog = React.forwardRef((props, ref) => {
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
    <div >
      <div style={hideWhenVisible}>
        <Button variant="outline-info" size="sm" id="viewblog" onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button variant="outline-info" size="sm" onClick={toggleVisibility}>hide</Button>
      </div>
    </div>
  )
})

TogglableBlog.displayName = 'TogglableBlog'


export default TogglableBlog