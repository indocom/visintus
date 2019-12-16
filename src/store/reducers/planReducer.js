const initState = {
    plan : localStorage.getItem('plan') ? JSON.parse(localStorage.getItem('plan')) : ["intro"]
}

const planReducer = (state = initState, action) => {
    if(action.type === 'ADD_PLAN'){
        let plan = [...state.plan, action.plan];
        localStorage.setItem('plan', JSON.stringify(plan));
        return{
            ...state,
            plan
        } 
    } else {
        return state
    }
}

export default planReducer