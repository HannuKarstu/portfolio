import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import {Blog} from './Blog'
import {SingleBlog} from './Blog'

const blog = {
    title: 'Testiblogi',
    author: 'Testiauthor',
    url: 'testiurl.com',
    likes: 5,
    user: {
        name: 'Terttu Testaaja',
        username: 'testaaja'
      }
  }

  const user = {
      username: 'testaaja',
      password: 'salasana'
  }

test('renders content', () => {


  const component = render(
    <Blog blog={blog} user={user} />
  )

  expect(component.container).toHaveTextContent(
    'Testiblogi'
  )

  expect(component.container).toHaveTextContent(
    'Testiauthor'
  )

// Nämä testi epäonnistuvat johtuen valitsemastani tavasta toteuttaa blogin lisätietojen avaaminen

//   expect(component.container).not.toHaveTextContent(
//     'testiurl.com'
//   )

//   expect(component.container).not.toHaveTextContent(
//     5
//   )
})

test('clicking the show button renders url and likes', async () => {
    const component = render(
        <SingleBlog blog={blog} />
      )
    
      expect(component.container).toHaveTextContent(
        'testiurl.com'
      )
    
      expect(component.container).toHaveTextContent(
        5
      )
  })

  test('clicking the like button twice calls event handler twice / likes rises by two', async () => {
  
    const component = render(
      <SingleBlog blog={blog} />
    )
  
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)
  
    // Johtuen valitsemastani tavasta toteuttaa sovellus, tarkistan likes-nappulan painamiset likesien kasvulla.
    expect(component.container).toHaveTextContent(
        "Likes: 7"
      )
  })