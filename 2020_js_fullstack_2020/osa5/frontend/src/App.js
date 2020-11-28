import React, { useState, useEffect } from 'react'
import { BlogDisplay } from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import NewBlog from './components/Newblog'

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

  // LOGIN
  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        {message}

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit" id="login-button">login</button>
        </form>
      </div>
    )
  }

  // KIRJAUTUMISEN JÄLKEEN
  return (
    <div>

      <h2>blogs</h2>

      <h3>{user.name} logged in</h3>

      {message}<br></br>

      <button onClick={(() =>
        handleLogout())}>
        Logout </button>

      <button id="update" onClick={(() =>
        handleBlogsUpdate())}>
        Update sorting </button>

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

    </div>
  )
}

export default App