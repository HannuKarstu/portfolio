import React, { useState } from 'react'
import TogglableBlog from './TogglableBlog'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'
import { ListGroup, Button, ButtonGroup } from 'react-bootstrap'



const SingleBlog = ({
  blog
}) => {
  const [likes, setLikes] = useState(blog.likes)

  const handleLikes = (blogObject) => {
    setLikes(blogObject.likes)
  }

  const LikeButton = async (event) => {
    const blogObject = {
      user: blog.user,
      likes: likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }

    event.preventDefault()
    handleLikes(blogObject)
    blogService.update(blog.id, blogObject)
  }

  return (
    <div>
      Url: {blog.url} <br></br>
      Likes: <div id="likesamount">{likes}</div> <Button variant="outline-success" size="sm" id="likebutton" onClick={LikeButton}>like</Button> <br></br>
      Added by: {blog.user.name}
    </div>
  )
}

const Blog = ({ blog, handleBlogsUpdate, notification, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,

    borderWidth: 1,
    marginBottom: 5
  }

  const DeleteButton = async (event) => {
    event.preventDefault()
    if (window.confirm(`Do you want to remove ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog.id)
      handleBlogsUpdate()
      notification(`${blog.title} removed from list`)
    }

  }


  if (blog.user.username === user.username) {
    return (
      <ListGroup.Item>
        <div id="Testiblogi" name="blog" style={blogStyle}>
          <h4>{blog.title} <i>by</i> {blog.author}</h4>


          <TogglableBlog blog={blog} buttonLabel='show'>
            <SingleBlog
              blog={blog}
            />
          </TogglableBlog>
          <br></br>
          <Button variant="outline-danger" size="sm" id="deletebutton" onClick={DeleteButton}>delete</Button>

        </div>
      </ListGroup.Item>
    )
  } else {
    return (
      <ListGroup.Item>
        <div name="blog" style={blogStyle}>
          <h4>{blog.title} <i>by</i> {blog.author}</h4>
          <TogglableBlog buttonLabel='show'>
            <SingleBlog
              blog={blog}
            />
          </TogglableBlog>
        </div>
      </ListGroup.Item>
    )
  }
}

const BlogDisplay = ({
  blogs,
  notification,
  handleBlogsUpdate,
  user
}) => {

  let blogsSorted = blogs.sort(function (a, b) {
    return b.likes - a.likes
  })

  return (
    <div>
      <ListGroup>
        {blogsSorted.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            notification={notification}
            handleBlogsUpdate={handleBlogsUpdate}
            user={user}
          />)}
      </ListGroup>
    </div>
  )
}


BlogDisplay.propTypes = {
  blogs: PropTypes.array.isRequired,
  notification: PropTypes.func.isRequired,
  handleBlogsUpdate: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}


export {
  Blog,
  BlogDisplay,
  SingleBlog
}
