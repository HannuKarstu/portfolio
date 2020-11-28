const initialState = {
  good: 0,
  neutral: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  //console.log(action)
  let statecopy = {}

  switch (action.type) {
    case 'GOOD':
      statecopy = {...state}
      statecopy.good ++
      return statecopy
    case 'NEUTRAL':
      statecopy = {...state}
      statecopy.neutral ++
      return statecopy
    case 'BAD':
      statecopy = {...state}
      statecopy.bad ++
      return statecopy
    case 'ZERO':
      return initialState
    default:
      return state
  }

}

export default counterReducer