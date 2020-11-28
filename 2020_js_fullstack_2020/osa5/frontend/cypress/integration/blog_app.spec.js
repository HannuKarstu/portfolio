describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'Heikki Hakkeri',
            username: 'hakkeri',
            password: 'password'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')

    })

    it('Login form is shown', function () {
        cy.get('h2')
            .should('contain', 'Log in to application')

    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.get('input:first').type('hakkeri')
            cy.get('input:last').type('password')
            cy.get('#login-button').click()

            cy.contains('Heikki Hakkeri logged in')
        })

        it('fails with wrong credentials', function () {
            cy.get('input:first').type('hakkeri')
            cy.get('input:last').type('wrongpassword')
            cy.get('#login-button').click()

            cy.contains('wrong username or password')
        })
    })

    describe('When logged in', function () {
        beforeEach(function () {
            cy.get('input:first').type('hakkeri')
            cy.get('input:last').type('password')
            cy.get('#login-button').click()
        })

        it('A blog can be created', function () {
            cy.get('#addblog').click()
            cy.get('#title').type('Testiblogi')
            cy.get('#author').type('Testiauthor')
            cy.get('#url').type('Testiurl')

            cy.get('#submit').click()
            cy.contains('Testiblogi')
            cy.contains('Testiauthor')
            cy.contains('Testiurl')

        })

        it('A blog can be liked', function () {
            cy.get('#addblog').click()
            cy.get('#title').type('Testiblogi')
            cy.get('#author').type('Testiauthor')
            cy.get('#url').type('Testiurl')

            cy.get('#submit').click()

            cy.get('#viewblog').click()
            cy.get('#likebutton').click()
            cy.contains('Likes: 1')

        })

        it('A blog can be deleted', function () {
            cy.get('#addblog').click()
            cy.get('#title').type('Testiblogi')
            cy.get('#author').type('Testiauthor')
            cy.get('#url').type('Testiurl')

            cy.get('#submit').click()

            cy.get('#viewblog').click()
            cy.get('#deletebutton').click()
            cy.contains('Testiblogi').should('not.exist')

        })

        // it.only('When creating blog, inputs send correct values', function () {
        //     cy.get('#addblog').click()
        //     cy.get('#title').type('Testiblogi')
        //     cy.get('#author').type('Testiauthor')
        //     cy.get('#url').type('Testiurl')


        //     // cy.get('input').should('not.have.value', 'Jane')
        //     const author = component.container.querySelector('#author')

        //     (author).should('have.value','Testiauthor')

        //     cy.get('#submit').click()

            

        // })

       

        it('Blogs can be sorted by likes', function () {
            cy.get('#addblog').click()

            // Lisätään blogi1
            cy.get('#title').type('testiblogi')
            cy.get('#author').type('Testiauthor')
            cy.get('#url').type('Testiurl')
            cy.get('#submit').click()

            // Lisätään blogi2
            cy.get('#title').type('testi2')
            cy.get('#author').type('Testiau2')
            cy.get('#url').type('Testiur2')
            cy.get('#submit').click()
            cy.wait(2000)

            // Molemmille yksi tykkäys + ekalle toinen tykkäys
            cy.get('[id^=viewblog]').click({ multiple: true })
            cy.get('[id^=likebutton]').click({ multiple: true })
            cy.get('#likebutton').click()

            cy.get(`#update`).click()  //update sorting

            // Ekan pitäisi olla eniten tykkäyksiä
            cy.get('#likesamount').should('contain', '2')        

        })

    })


})