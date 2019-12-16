export const addPlan = (plan) => {
    return {
        type: 'ADD_PLAN',
        plan
    }
}

export const removePlan = (id) => {
    return {
        type: 'REMOVE_PLAN',
        id
    }
}
