export const actionTypes = {
  addPlan: 'ADD_PLAN',
  removePlan: 'REMOVE_PLAN',
  removeCategory: 'REMOVE_CATEGORY'
};

export const addPlan = (plan, slug) => {
  return {
    type: 'ADD_PLAN',
    plan,
    slug
  };
};

export const removePlan = (id, slug) => {
  return {
    type: 'REMOVE_PLAN',
    id,
    slug
  };
};

export const removeCategory = slug => {
  return {
    type: 'REMOVE_CATEGORY',
    slug
  };
};
