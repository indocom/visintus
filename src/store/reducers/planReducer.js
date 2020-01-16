// const initState = {
//     plan : localStorage.getItem('plan') ? JSON.parse(localStorage.getItem('plan')) : [{
//         body: "Introduction to NUS",
//         id: 0,
//         title: "intro"
//     }
//     ]
// }

// const planReducer = (state = initState, action) => {
//     console.log(state)
//     if(action.type === 'ADD_PLAN'){
//         if(state.plan.filter(plan => plan._id === action.plan._id).length > 0){
//             return state
//         } else {
//             let plan = [...state.plan, action.plan];
//             localStorage.setItem('plan', JSON.stringify(plan));
//             return{
//                 ...state,
//                 plan
//             }
//         } 
//     } else if (action.type === 'REMOVE_PLAN'){
//         let plan = state.plan.filter(plan => plan._id !== action._id);
//         localStorage.setItem('plan', JSON.stringify(plan));
//         return{
//             ...state,
//             plan
//         } 
//     } else {
//         return state
//     }
// }

// export default planReducer

const initState = {
	itin : localStorage.getItem('plan-info') 
		? JSON.parse(localStorage.getItem('plan-info')).itin 
		: {intro: [{
					_id: 0,
					name: "Introduction to NUS",
					description: "Lorem ipsum si dolor amet",
				}]
			}
}

const planReducer = (state = initState, action) => {
  if(action.type === 'ADD_PLAN'){
    const sameSlug = state.itin[action.slug];
    if(typeof sameSlug !== 'undefined'){
      if (sameSlug.filter(plan => plan._id === action.plan._id).length > 0){
        return state
      } else {
        let newPlan = [...sameSlug, action.plan];
        let newPlanInfo = {
          ...state,
          itin : {
            ...state.itin,
            [action.slug]: newPlan
          }
        }
        localStorage.setItem('plan-info', JSON.stringify(newPlanInfo));
        return newPlanInfo;
      } 
    } else {
      let newPlanInfo = {
        ...state,
        itin : {
          ...state.itin,
          [action.slug]: [action.plan]
        }
      }
      localStorage.setItem('plan-info', JSON.stringify(newPlanInfo));
      return newPlanInfo;
    }
  } else if (action.type === 'REMOVE_PLAN'){
    const sameSlug = state.itin[action.slug]
    console.log(sameSlug)
    let newPlan = sameSlug.filter(plan => plan._id !== action.id);
    console.log(newPlan)
    let newPlanInfo = {
      ...state,
      itin : {
        ...state.itin,
        [action.slug]: newPlan
      }
    }
    localStorage.setItem('plan-info', JSON.stringify(newPlanInfo));
    return newPlanInfo
  } else if (action.type === 'REMOVE_CATEGORY') {
    let newPlanInfo = {
      ...state,
      itin: {
        ...state.itin
      }
    }
    delete newPlanInfo.itin[action.slug]
    localStorage.setItem('plan-info', JSON.stringify(newPlanInfo));
    return newPlanInfo
  } else {
    return state
  }
}

export default planReducer

