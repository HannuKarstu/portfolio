import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { initializeAnecdotes } from '../reducers/anecdoteReducer'
import { newNotification } from '../reducers/notificationReducer'


const AnecdoteList = (props) => {
    const dispatch = useDispatch()

    // Alustus, db:ssä olevat anekdootit storeen
    useEffect(() => {
        dispatch(initializeAnecdotes())
    }, [dispatch])

    const anecdotes = useSelector(state => state.anecdotes)

    // Lajitellaan votesien mukaan
    let sorted = [...anecdotes].sort((a, b) => (a.votes < b.votes) ? 1 : -1)

    // Haetaan filtterin tila
    let filterState = useSelector(state => state.filter)

    // Filtteröidään sorted filtterin tilan mukaan
    let filtered = sorted.filter(item => item.content.toLowerCase().includes(filterState.toLowerCase()))


    const vote = ({ anecdote }) => {
        console.log('vote', anecdote.id)
        dispatch(voteAnecdote(anecdote))
        dispatch(newNotification(`you voted "${anecdote.content}"`, 5))
    }

    return (
        <>
            {filtered.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote({ anecdote })}>vote</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default AnecdoteList