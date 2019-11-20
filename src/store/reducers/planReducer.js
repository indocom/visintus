const initState = {
    plan : ["intro"]
}

const planReducer = (state = initState, action) => {
    if(action.type === 'ADD_PLAN'){
        return{
            ...state,
            plan: [...state.plan, action.plan]
        } 
    } else {
        return state
    }
}

export default planReducer