export const addPlan = (plan, slug) => {
    return {
        type: 'ADD_PLAN',
        plan,
        slug
    }
}

export const removePlan = (id, slug) => {
    return {
        type: 'REMOVE_PLAN',
        id,
        slug
    }
}
