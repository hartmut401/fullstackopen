import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    removeBlog(state, action) {
      const id = action.payload
      state.filter((blog) => blog.id !== id)
    },
    increaseLikes(state, action) {
      return action.payload
    },
  },
})

export const { appendBlog, setBlogs, removeBlog, increaseLikes } =
  blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch(removeBlog(id))
  }
}

export const likeBlog = (id) => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    const blogToChange = blogs.find((b) => b.id === id)
    const changedBlog = {
      ...blogToChange,
      likes: blogToChange.likes + 1,
    }
    const newState = blogs.map((blog) => (blog.id !== id ? blog : changedBlog))
    newState.sort((a, b) => b.votes - a.votes)
    await blogService.update(changedBlog)
    dispatch(increaseLikes(newState))
  }
}

export default blogSlice.reducer
