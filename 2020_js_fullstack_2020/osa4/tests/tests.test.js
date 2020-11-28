const listHelper = require('../utils/list_helper')
const blogs = require('./sampleblogs')
const list_helper = require('../utils/list_helper')
let emptyList = []
let listWithOneBlog = []
listWithOneBlog[0] = blogs[0]

let authorWithMostBlogs = {
  author: "Bloggy McBlogface",
  blogs: 2
}

let authorWithOneBlog = {
  author: "John B. Blogger",
  blogs: 1
}

let authorWithMostLikes = {
  author: "John B. Blogger",
  likes: 4
}



test('dummy returns one', () => {

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})


// TOTAL LIKES
describe('total likes', () => {

  test('of a empty list is zero', () => {
    const result = listHelper.totalLikes(emptyList)
    expect(result).toBe(0)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(10)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(4)
  })
})


// FAVORITE BLOG
describe('favorite blog', () => {

  test('of a blog list is blog with most likes', () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(blogs[0])
  })

  test('of a empty list is undefined', () => {
    const result = listHelper.favoriteBlog(emptyList)
    expect(result).toEqual(undefined)
  })

  test('of a blog list with only one blog is likes of that blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual(listWithOneBlog[0])
  })

})

// MOST BLOGS
describe('most blogs', () => {

  test('of a blog list is author with most blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual(authorWithMostBlogs)
  })

  test('of a empty list is undefined', () => {
    const result = listHelper.mostBlogs(emptyList)
    expect(result).toEqual(undefined)
  })

  test('of a blog list with just one blog is the author of that blog', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual(authorWithOneBlog)
  })

})

// MOST LIKES
describe('most likes', () => {

  test('of a blog list is author with most likes', () => {
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual(authorWithMostLikes)
  })

  test('of a blog list with just one blog is author of that blog', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result).toEqual(authorWithMostLikes)
  })

  test('of a empty list is undefined', () => {
    const result = listHelper.mostLikes(emptyList)
    expect(result).toEqual(undefined)
  })
})

