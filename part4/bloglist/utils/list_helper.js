const _ = require('lodash')
const blog = require('../models/blog')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (list) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }

  return list.length === 0
    ? 0
    : list.reduce(reducer, 0)
}

const favoriteBlog = (list) => {
  if (list.length === 0) {
    return 0
  } else {
    const likes = list.map(({ likes }) => likes)
    const maxIndex = likes.indexOf(Math.max(...likes))
    return JSON.parse(JSON.stringify(list[maxIndex],['title', 'author', 'likes']))
  }
}

const mostBlogs = (list) => {
  if (list.length === 0) {
    return 0
  } else {
    const blogsPerAuthor = _.countBy(list.map(({ author }) => author))
    const authors = _.keys(blogsPerAuthor)
    const blogs = _.values(blogsPerAuthor)

    const maxValue = Math.max(...blogs)
    const maxValueIndex = blogs.indexOf(Math.max(...blogs))
    const authorOfMostBlogs = authors[maxValueIndex]

    const author = {
      author: authorOfMostBlogs,
      blogs: maxValue
    }

    return author
  }
}

const mostLikes = (list) => {
  const authors = _.uniq(list.map(({ author }) => author))

  let maxAuthor = ''
  let maxLikes= 0

  _.forEach(authors, (value) => {
    const author = list.filter(blog => blog.author === value)
    const likes = _.sumBy(author, 'likes')
    if (likes > maxLikes) {
      maxAuthor = value
      maxLikes = likes
    }
  })

  const author = {
    author: maxAuthor,
    likes: maxLikes
  }
  return author
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}