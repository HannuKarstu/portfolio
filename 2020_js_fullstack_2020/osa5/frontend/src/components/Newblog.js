import React, { useState } from 'react'
import Togglable from './Togglable'
import blogService from '../services/blogs'



const NewBlog = ({
  notification,
  handleBlogsUpdate
}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateNew = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    try {
      blogService
        .create(blogObject)

      setTitle('')
      setAuthor('')
      setUrl('')
      setTimeout(() => {

        handleBlogsUpdate()
      }, 100);


    } catch (exception) {
      notification('something went wrong')
    }



    let mess = `a new blog ${blogObject.title} by ${blogObject.author} added!`

    notification(mess)
  }

  return (
    <Togglable id="addblog" buttonLabel='add blog'>
      <div>
        <h2>create new</h2>
        <form onSubmit={handleCreateNew}>
          <div>
            title
            <input
              type="text"
              value={title}
              name="Title"
              id="title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author
            <input
              type="text"
              value={author}
              name="Author"
              id="author"
              onChange={({ target }) => setAuthor(target.value)}

            />
          </div>
          <div>
            url
            <input
              type="text"
              value={url}
              name="Url"
              id="url"
              onChange={({ target }) => setUrl(target.value)}

            />
          </div>
          <button id="submit" type="submit">create</button>
        </form>
      </div>
    </Togglable>
  )
}



export default NewBlog