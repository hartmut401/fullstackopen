describe('Note app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen',
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('Login form is shown', function () {
    cy.get('#username')
    cy.get('#password')
    cy.get('#login-button').contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('A blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('#title').type('title...')
      cy.get('#author').type('author...')
      cy.get('#url').type('url...')
      cy.get('#create-button').click()
      cy.contains('title... author')
    })

    it('A blog can be liked', function () {
      cy.createBlog({ title: 'title...', author: 'author...', url: 'url...' })
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('likes 1')
    })

    it('A blog can be deleted by authorized user', function () {
      cy.createBlog({ title: 'title...', author: 'author...', url: 'url...' })
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.get('#blog-list').should('not.contain', 'title...')
    })
  })

  describe('Users...', function () {
    beforeEach(function () {
      const user = {
        name: 'Hartmut Rommel',
        username: 'hartmut',
        password: 'salainen',
      }
      cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
      cy.login({ username: 'mluukkai', password: 'salainen' })
      cy.createBlog({ title: 'title...', author: 'author...', url: 'url...' })
      cy.contains('logout').click()
    })

    it('...cannot delete blogs of another creator', function () {
      cy.login({ username: 'hartmut', password: 'salainen' })
      cy.contains('view').click()
      cy.get('#delete-button').should('have.class', 'hidden')
    })
  })

  describe('Blogs are ordered...', function () {
    it('...according to likes with the blog with the most likes being first', function () {
      cy.login({ username: 'mluukkai', password: 'salainen' })
      cy.createBlog({
        title: 'title1...',
        author: 'author1...',
        url: 'url1...',
        likes: 2,
      })
      cy.createBlog({
        title: 'title2...',
        author: 'author2...',
        url: 'url2...',
        likes: 5,
      })
      cy.createBlog({
        title: 'title3...',
        author: 'author3...',
        url: 'url3...',
        likes: 3,
      })
      cy.get('.blog').eq(0).should('contain', 'title2...')
      cy.get('.blog').eq(1).should('contain', 'title3...')
      cy.get('.blog').eq(2).should('contain', 'title1...')
    })
  })
})
