const router = require('express').Router()
const Comment = require('../models/comment')
const Blog = require('../models/blog')

router.post('/', async (request, response) => {
  const { content, blogId } = request.body
  console.log(request.body)
  const blog = await Blog.findById(blogId)
  const comment = new Comment({
    content,
    blog: blog._id,
  })

  let createdComment = await comment.save()

  blog.comments = blog.comments.concat(createdComment._id)
  await blog.save()

  createdComment = await Comment.findById(createdComment._id).populate('blog')

  response.status(201).json(createdComment)
})

module.exports = router
