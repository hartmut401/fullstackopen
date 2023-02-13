const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
} else {
  const password = process.argv[2]

  const url =
    `mongodb+srv://fullstack:${password}@cluster0.b40wgjl.mongodb.net/testBloglistApp?retryWrites=true&w=majority`

  mongoose.set('strictQuery',false)
  mongoose.connect(url)

  const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })

  const Blog = mongoose.model('Blog', blogSchema)

  const blog = new Blog({
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2
  })

  blog.save().then(result => {
    console.log('blog saved')
    mongoose.connection.close()
  })
}