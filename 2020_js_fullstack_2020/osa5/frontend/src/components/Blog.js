import React, { useState } from 'react'
import TogglableBlog from './TogglableBlog'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'



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
      Likes: <div id="likesamount">{likes}</div> <button id="likebutton" onClick={LikeButton}>like</button> <br></br> 
      Added by: {blog.user.name}
    </div>
  )
}

const Blog = ({ blog, handleBlogsUpdate, notification, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
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
      <div id="Testiblogi" name="blog" style={blogStyle}>
        <b>{blog.title} by {blog.author}</b>
        <TogglableBlog blog={blog} buttonLabel='show'>
          <SingleBlog
            blog={blog}
          />
        </TogglableBlog>
        <button id="deletebutton" onClick={DeleteButton}>delete</button> <br></br>
      </div>
    )
  } else {
    return (
      <div name="blog" style={blogStyle}>
        <b>{blog.title} by {blog.author}</b>
        <TogglableBlog buttonLabel='show'>
          <SingleBlog
            blog={blog}
          />
        </TogglableBlog>
      </div>
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
      {blogsSorted.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          notification={notification}
          handleBlogsUpdate={handleBlogsUpdate}
          user={user}
        />)}
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
