const initState = {
    plan : ["testing"]
}

const planReducer = (state = initState, action) => {
    if(action.type == 'ADD_PLAN'){
        let newPlan = [...state.plan, action.plan];
        return{
            ...state,
            plan: newPlan
        } 
    } else {
        return state
    }
}

export default planReducer