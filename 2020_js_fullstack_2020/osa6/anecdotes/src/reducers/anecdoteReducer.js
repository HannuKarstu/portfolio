import anecdoteService from '../services/anecdotes'


const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]

    case 'VOTE':
      // Otetaan votetetun anekdootin id
      const id = action.data.updatedAnecdote.id

      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : action.data.updatedAnecdote
      )

    case 'INIT_ANECDOTES':
      return action.data

    default:
      return state
  }
}

// VOTE
export const voteAnecdote = (anecdoteObject) => {
  return async dispatch => {
    let votes = anecdoteObject.votes + 1
    const voteAdded = { ...anecdoteObject, votes: votes }
    const updatedAnecdote = await anecdoteService.update(anecdoteObject.id, voteAdded)
    dispatch({
      type: 'VOTE',
      data: { updatedAnecdote }
    })
  }
}


// CREATE
export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

// INIT
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default reducer