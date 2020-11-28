const reducer = (state = "", action) => {
    console.log('state now: ', state)
    console.log('action', action)

    switch (action.type) {
        case 'NEW_NOTIFICATION':
            return action.data
        default:
            return state
    }
}

let timer

export const newNotification = (content, seconds) => {
    let showTime = seconds * 1000

    const notificationTimeOut = (props) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            props.dispatch({
                type: 'NEW_NOTIFICATION',
                data: ""
            })
        }, showTime);
    }



    return async dispatch => {
        dispatch({
            type: 'NEW_NOTIFICATION',
            data: content
        })
        notificationTimeOut(dispatch={dispatch})
        
    }
}

export default reducer