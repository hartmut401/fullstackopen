import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> calls onSubmit with the right details', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm addBlog={() => {}} title={''} author={''} url={''} createBlog={createBlog} />)

  const inputs = screen.getAllByRole('textbox')
  const sendButton = screen.getByText('create')

  await user.type(inputs[0], 'title...')
  await user.type(inputs[1], 'author...')
  await user.type(inputs[2], 'url...')
  await user.click(sendButton)

  expect(createBlog.mock.calls[0][0].title).toBe('title...')
  expect(createBlog.mock.calls[0][0].author).toBe('author...')
  expect(createBlog.mock.calls[0][0].url).toBe('url...')
})