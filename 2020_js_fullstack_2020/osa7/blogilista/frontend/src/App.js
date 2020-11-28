import React, { useState, useEffect } from 'react'
import { BlogDisplay } from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import NewBlog from './components/Newblog'
import Users from './components/Users'
import { Button, Form } from 'react-bootstrap'


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useRouteMatch,
  useHistory,
} from "react-router-dom"



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const notification = (notif) => {
    setMessage(notif)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const ShowNotification = ({ message }) => {
    const notifstyle = {
      background: "lightgreen",
      padding: "20px",
      opacity: "1",
      "border-radius": "15px",
      border: "1px solid black"

  }

  if (message == null) return (
    <>
      
    </>
  )

  return (
    <div style={notifstyle}>
      {message}
    </div>
  )
}

useEffect(() => {
  blogService.getAll().then(blogs =>
    setBlogs(blogs)
  )
}, [])

useEffect(() => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogsappUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    setUser(user)
    blogService.setToken(user.token)
  }
}, [])

const handleLogin = async (event) => {
  event.preventDefault()
  try {
    const user = await loginService.login({
      username, password,
    })

    window.localStorage.setItem(
      'loggedBlogsappUser', JSON.stringify(user)
    )

    blogService.setToken(user.token)
    setUser(user)
    setUsername('')
    setPassword('')
    notification('successful login')

  } catch (exception) {
    notification('wrong username or password')
  }
  console.log('logging in with', username, password)
}

const handleLogout = () => {
  try {
    window.localStorage.clear()

    blogService.setToken(null)
    setUser(null)
    setUsername('')
    setPassword('')
    notification('logged out')

  } catch (exception) {
    notification('error logging out')
  }
  console.log('logging out')
}

const handleBlogsUpdate = async () => {

  let updatedBlogs = await blogService.getAll()
  setBlogs(updatedBlogs)

}

const Menu = ({
  user,
  handleLogout
}) => {

  const padding = {
    paddingRight: 5
  }


  return (
    <div>
      <Link style={padding} to="/">blogs</Link>
      <Link style={padding} to="/users">users</Link>
        -- <i>{user.name} </i> logged in   <Button variant="danger" size="sm" onClick={(() =>
        handleLogout())}>
        Logout </Button>
    </div>
  )
}

// LOGIN
if (user === null) {
  return (
    <div class="container">
      <h2>Log in to application</h2>
      <ShowNotification message={message} />

      <Form onSubmit={handleLogin}>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </Form.Group>


        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)} />
          <Form.Text className="text-muted">
            Never share your password with anyone else.
            </Form.Text>
        </Form.Group>

        <Button variant="outline-primary" type="submit" id="login-button">login</Button>
      </Form>
    </div>
  )
}

// KIRJAUTUMISEN JÄLKEEN
return (
  <div class="container">
    <Menu
      user={user}
      handleLogout={handleLogout}
    />

    <h2>bloglist app</h2>

    {/* <h3>{user.name} logged in</h3> */}

    {/* Message */}
    <ShowNotification message={message} /><br></br>

    {/* Logout */}
    {/* <button onClick={(() =>
        handleLogout())}>
        Logout </button> */}

    <Switch>

      <Route path='/users'>
        <h3>users</h3>
        <Users />
      </Route>

      <Route path='/'>
        <h3>blogs</h3>

        {/* Update sorting */}
        <Button variant="outline-success" id="update" onClick={(() =>
          handleBlogsUpdate())}>
          Update sorting </Button>
        <br></br><br></br>

        {/* Blogilistaus */}

        <BlogDisplay
          blogs={blogs}
          notification={notification}
          handleBlogsUpdate={handleBlogsUpdate}
          user={user}
        />

        {/* Blogin lisäys */}
        <NewBlog
          handleBlogsUpdate={handleBlogsUpdate}
          notification={notification}
        />
      </Route>

    </Switch>



  </div>
)
}

export default App