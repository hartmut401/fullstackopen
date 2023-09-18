import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'FP Basics E3',
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2013/01/07/FPBE3-Do-the-rules-change.html',
  likes: 2,
  user: {
    name: 'Hartmut Rommel',
  },
}

describe('<Note /> Initial view', () => {
  test('renders title and author', () => {
    render(<Blog blog={blog} />)

    const element = screen.getByText('FP Basics E3 Robert C. Martin', {
      exact: false,
    })

    // screen.debug(element)

    expect(element).toBeDefined()
  })

  test('does not render url', () => {
    render(<Blog blog={blog} />)

    const element = screen.queryByText(
      'http://blog.cleancoder.com/uncle-bob/2013/01/07/FPBE3-Do-the-rules-change.html',
      {
        exact: false,
      }
    )

    //screen.debug(element)

    expect(element).toBeNull()
  })

  test('does not render likes', () => {
    render(<Blog blog={blog} />)

    const element = screen.queryByText('likes 2', {
      exact: false,
    })

    //screen.debug(element)

    expect(element).toBeNull()
  })
})

describe('<Note /> Detailed view', () => {
  beforeEach(() => {
    render(<Blog blog={blog} />)
  })

  test('after clicking the button, url is displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const element = screen.getByText(
      'http://blog.cleancoder.com/uncle-bob/2013/01/07/FPBE3-Do-the-rules-change.html',
      {
        exact: false,
      }
    )

    // screen.debug(element)

    expect(element).toBeDefined()
  })

  test('after clicking the button, likes are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const element = screen.getByText('likes 2', {
      exact: false,
    })

    // screen.debug(element)

    expect(element).toBeDefined()
  })
})

describe('<Note /> Increase likes', () => {
  test('if the like button is clicked twice, the event handler is called twice', async () => {
    const increaseLikes = jest.fn()
    const user = userEvent.setup()

    render(<Blog blog={blog} increaseLikes={increaseLikes} />)

    const detailsButton = screen.getByText('view')
    await user.click(detailsButton)
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(increaseLikes.mock.calls).toHaveLength(2)
  })
})
