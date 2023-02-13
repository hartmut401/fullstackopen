const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const { deleteOne } = require('../models/blog')

const tokenToUse = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1sdXVra2FpIiwiaWQiOiI2M2U5MjU5OTY4YjI4OGQ2ZjI2NzFmZDYiLCJpYXQiOjE2NzYyNzM0MTQsImV4cCI6MTY3NjI3NzAxNH0.Pi3NY-vs5rz5Ur7V0uqjVJcbtUXdIniJjFwyEOl0m9o'

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('auth tests', () => {
  test('there are six blogs', async () => {
    const response = await api
      .get('/api/blogs')
      .set('authorization', `Bearer ${tokenToUse}`)
    expect(response.body).toHaveLength(6)
  })

  test('a blog without token is unauthorized', async () => {
    const newBlog = {
      title: 'my new blog entry',
      author: 'unknown',
      url: 'n/a',
      likes: 99
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', '')
      .expect(401)
  })
})

describe('api tests', () => {
  test('there are six blogs', async () => {
    const response = await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${tokenToUse}`)
    expect(response.body).toHaveLength(6)
  })

  test('unique identifier "id" exists', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToTest = blogsAtStart[0]

    expect(blogToTest.id).toBeDefined()
  })

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'my new blog entry',
      author: 'unknown',
      url: 'n/a',
      likes: 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${tokenToUse}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(n => n.title)
    expect(titles).toContain(
      'my new blog entry'
    )
  })

  test('likes property defaults to zero', async () => {
    const newBlog = {
      title: 'my new blog entry without likes',
      author: 'unknown',
      url: 'n/a'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${tokenToUse}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const blogToTest = blogsAtEnd[blogsAtEnd.length - 1]
    console.log(JSON.stringify(blogToTest))
    expect(blogToTest.likes).toBe(0)
  })

  test('title is missing', async () => {
    const newBlog = {
      author: 'unknown',
      url: 'n/a',
      likes: 1
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${tokenToUse}`)
      .expect(400)
  })

  test('url is missing', async () => {
    const newBlog = {
      title: 'my new blog entry without url',
      author: 'unknown',
      likes: 2
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${tokenToUse}`)
      .expect(400)
  })

  test('deletion succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${tokenToUse}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  })

  test('update succeeds with status code 200 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    blogToUpdate.likes = 999
    console.log(`/api/blogs/${blogToUpdate.id}`)
    console.log(JSON.stringify(blogToUpdate))
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .set('Authorization', `Bearer ${tokenToUse}`)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length
    )

    const likes = blogsAtEnd.map(r => r.likes)

    expect(likes).toContain(blogToUpdate.likes)
  })
})

afterAll(async() => {
  await mongoose.connection.close()
})