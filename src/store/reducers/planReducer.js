const initState = {
    plan : localStorage.getItem('plan') ? JSON.parse(localStorage.getItem('plan')) : [{
        body: "Introduction to NUS",
        id: 0,
        title: "intro"
    }
    ]
}

const planReducer = (state = initState, action) => {
    console.log(state)
    if(action.type === 'ADD_PLAN'){
        if(state.plan.filter(plan => plan.id === action.plan.id).length > 0){
            return state
        } else {
            let plan = [...state.plan, action.plan];
            localStorage.setItem('plan', JSON.stringify(plan));
            return{
                ...state,
                plan
            }
        } 
    } else if (action.type === 'REMOVE_PLAN'){
        let plan = state.plan.filter(plan => plan.id !== action.id);
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
