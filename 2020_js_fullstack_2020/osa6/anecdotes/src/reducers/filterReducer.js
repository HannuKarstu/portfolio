const reducer = (state = "", action) => {
    console.log('state now: ', state)
    console.log('action', action)

    switch (action.type) {
        case 'NEW_FILTER':
            return action.data
        default:
            return state
    }
}

// NEW FILTER
export const newFilter = (content) => {
    return {
        type: 'NEW_FILTER',
        data: content
    }
}

export default reducer