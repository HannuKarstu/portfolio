import React from 'react'
import { useDispatch } from 'react-redux'
import { newFilter } from '../reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch()

    const filter = (event) => {
        event.preventDefault()
        const content = event.target.value
        dispatch(newFilter(content))
    }

    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1
    }
    return (
        <div style={style}>
            Filter:
            <input type="text" onChange={filter} />
        </div>
    )
}

export default Filter