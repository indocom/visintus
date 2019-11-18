const initState = {
    plan : null
}

const planReducer = (state = initState, action) => {
    if(action.type == 'ADD_PLAN'){
        const newPlan = [...state.plan, action.plan]
        return{
            ...state,
            plan: newPlan            
        }
    } else {
        return state
    }
}

export default planReducer