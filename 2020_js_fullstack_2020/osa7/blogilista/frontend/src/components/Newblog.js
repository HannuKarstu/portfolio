import React, { useState } from 'react'
import Togglable from './Togglable'
import blogService from '../services/blogs'
import { Button, Form } from 'react-bootstrap'


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
        <br></br>
        <h2>create new</h2>
        <Form onSubmit={handleCreateNew}>

          <Form.Group controlId="formTitle">
            <Form.Label>title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={title}
              name="Title"
              id="title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formTitle">
            <Form.Label>author</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter author"
              value={author}
              name="Author"
              id="author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </Form.Group>


          <Form.Group controlId="formTitle">
            <Form.Label>url</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter url"
              value={url}
              name="Url"
              id="url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </Form.Group>

          <Button variant="outline-success" id="submit" type="submit">create</Button>
          <br></br>  <br></br>
        </Form>
      </div>
    </Togglable>
  )
}



export default NewBlog