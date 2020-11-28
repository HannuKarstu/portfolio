import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { newNotification } from '../reducers/notificationReducer'


const AnecdoteForm = (props) => {
    const create = async (event) => {
        event.preventDefault()

        const content = event.target.anecdote.value
        event.target.anecdote.value = ''

        props.createAnecdote(content)

        props.newNotification(`you added anecdote "${content}"`, 5)

    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={create}>
                <input name="anecdote" />
                <button type="submit">create</button>
            </form>
        </>
    )
}

const mapDispatchToProps = {
    createAnecdote, newNotification
}

export default connect(
    null,
    mapDispatchToProps
)(AnecdoteForm)